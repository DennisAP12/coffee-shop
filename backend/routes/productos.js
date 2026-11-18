const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los productos o filtrar por categoría
router.get('/', async (req, res) => {
  const { categoria } = req.query;

  try {
    let query = `
      SELECT 
        p.id, 
        p.nombre, 
        p.descripcion, 
        p.precio, 
        p.imagen, 
        p.categoria AS category, 
        p.stock,
        COALESCE(SUM(v.cantidad), 0) AS ventas
      FROM productos p
      LEFT JOIN ventas v ON p.id = v.producto_id
    `;
    let params = [];

    if (categoria) {
      query += ' WHERE p.categoria = ?';
      params.push(categoria);
    }

    query += ' GROUP BY p.id, p.nombre, p.descripcion, p.precio, p.imagen, p.categoria, p.stock';

    const [rows] = await db.query(query, params);
    
    // Mapear ventas a tipo numérico
    const productos = rows.map(row => ({
      ...row,
      ventas: Number(row.ventas) || 0
    }));

    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener productos' });
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  const { nombre, descripcion, precio, imagen, category, stock } = req.body;

  if (!nombre || !descripcion || !precio || !category) {
    return res.status(400).json({ error: 'Todos los campos excepto el stock y la imagen son obligatorios' });
  }

  try {
    // Auto-generación de ID secuencial según categoría (ej. c7, f7, p7)
    const prefix = category === 'cafe' ? 'c' : category === 'frappe' ? 'f' : 'p';
    const [rows] = await db.query(
      'SELECT id FROM productos WHERE categoria = ? ORDER BY CAST(SUBSTRING(id, 2) AS UNSIGNED) DESC LIMIT 1',
      [category]
    );

    let newId = `${prefix}1`;
    if (rows.length > 0) {
      const lastId = rows[0].id;
      const lastNum = parseInt(lastId.substring(1));
      if (!isNaN(lastNum)) {
        newId = prefix + (lastNum + 1);
      }
    }

    // Asegurar que el precio sea un numero
    const numPrecio = Number(precio) || 0;

    // Imagen predeterminada si no se provee
    const defaultImg = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400';
    const finalImagen = imagen && imagen.trim() !== '' ? imagen.trim() : defaultImg;

    // Insertar en la BDz
    await db.query(
      'INSERT INTO productos (id, nombre, descripcion, precio, imagen, categoria, stock) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [newId, nombre, descripcion, numPrecio, finalImagen, category, Number(stock) || 0]
    );

    res.status(201).json({ message: 'Producto creado exitosamente', id: newId });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error interno del servidor al crear producto' });
  }
});

// Modificar un producto existente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, imagen, category, stock } = req.body;

  if (!nombre || !descripcion || !precio || !category) {
    return res.status(400).json({ error: 'Nombre, descripción, precio y categoría son obligatorios' });
  }

  try {
    // Asegurar que el precio sea numérico
    const numPrecio = Number(precio) || 0;

    // Imagen predeterminada si no se provee
    const defaultImg = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400';
    const finalImagen = imagen && imagen.trim() !== '' ? imagen.trim() : defaultImg;

    // Actualizar en la BD
    const [result] = await db.query(
      'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, imagen = ?, categoria = ?, stock = ? WHERE id = ?',
      [nombre, descripcion, numPrecio, finalImagen, category, Number(stock) || 0, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error interno del servidor al actualizar producto' });
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM productos WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(400).json({ error: 'No se puede eliminar el producto porque tiene ventas asociadas.' });
    }
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error interno del servidor al eliminar producto' });
  }
});

module.exports = router;
