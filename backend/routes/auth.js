const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Registro de Usuario
router.post('/registro', async (req, res) => {
  const { nombre, correo, password } = req.body;

  if (!nombre || !correo || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar si el correo ya existe
    const [existingUser] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Encriptar contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertar usuario (rol por defecto es 'cliente' en la BD)
    const [result] = await db.query(
      'INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)',
      [nombre, correo, hashedPassword]
    );

    res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


// Inicio de Sesión (Login)
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }

  try {
    // Buscar usuario
    const [users] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = users[0];

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar JWT
    const token = jwt.sign(
      { id: user.id, rol: user.rol, nombre: user.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        rol: user.rol
      }
    });

    // Actualizar perfil del usuario autenticado
    router.put('/perfil/:id', async (req, res) => {
      const { id } = req.params;
      const { nombre, correo, password } = req.body;
      const authorization = req.headers.authorization;

      if (!authorization?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No autorizado' });
      }

      if (!nombre || !correo) {
        return res.status(400).json({ error: 'Nombre y correo son obligatorios' });
      }

      try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (Number(decoded.id) !== Number(id)) {
          return res.status(403).json({ error: 'No puedes modificar otro perfil' });
        }

        const [existing] = await db.query(
          'SELECT id FROM usuarios WHERE correo = ? AND id <> ?',
          [correo, id]
        );
        if (existing.length > 0) {
          return res.status(409).json({ error: 'Ese correo ya está registrado por otra cuenta' });
        }

        if (password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          await db.query(
            'UPDATE usuarios SET nombre = ?, correo = ?, password = ? WHERE id = ?',
            [nombre, correo, hashedPassword, id]
          );
        } else {
          await db.query(
            'UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?',
            [nombre, correo, id]
          );
        }

        res.json({ message: 'Perfil actualizado', user: { id: Number(id), nombre, correo, rol: decoded.rol } });
      } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Sesión expirada' });
        }
        console.error('Error al actualizar perfil:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
