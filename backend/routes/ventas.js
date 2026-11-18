const express = require('express');
const router = express.Router();
const db = require('../db');

// Resumen administrativo
router.get('/resumen', async (req, res) => {
  try {
    const [[ventas]] = await db.query(
      'SELECT COALESCE(SUM(precio_total), 0) AS ingresos, COALESCE(SUM(cantidad), 0) AS productosVendidos, COUNT(*) AS ordenes FROM ventas'
    );
    const [[clientes]] = await db.query(
      "SELECT COUNT(*) AS total FROM usuarios WHERE rol = 'cliente'"
    );
    const [[bajoStock]] = await db.query(
      'SELECT COUNT(*) AS total FROM productos WHERE stock <= 5'
    );

    res.json({
      ingresos: Number(ventas.ingresos) || 0,
      productosVendidos: Number(ventas.productosVendidos) || 0,
      ordenes: Number(ventas.ordenes) || 0,
      clientes: Number(clientes.total) || 0,
      bajoStock: Number(bajoStock.total) || 0
    });
  } catch (error) {
    console.error('Error al obtener resumen administrativo:', error);
    res.status(500).json({ error: 'Error al obtener el resumen administrativo' });
  }
});

// Obtener todas las ventas
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ventas ORDER BY fecha DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    res.status(500).json({ error: 'Error al obtener datos de ventas' });
  }
});

// Registrar una nueva venta
router.post('/', async (req, res) => {
  const { usuario_id, items } = req.body;

  if (!usuario_id || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Faltan datos obligatorios para procesar la venta' });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    for (const item of items) {
      // Limpiar el formato de precio (ej. "$58.00 MXN" -> 58.00)
      const precioString = String(item.precio);
      const precioNum = parseFloat(precioString.replace(/[^0-9.]/g, '')) || 0;
      const precioTotal = precioNum * item.cantidad;

      const [[producto]] = await connection.query(
        'SELECT stock, nombre FROM productos WHERE id = ? FOR UPDATE',
        [item.id]
      );
      if (!producto) {
        throw new Error(`El producto ${item.id} ya no existe`);
      }
      if (Number(item.cantidad) > Number(producto.stock)) {
        throw new Error(`Stock insuficiente para ${producto.nombre}`);
      }

      await connection.query(
        'INSERT INTO ventas (usuario_id, producto_id, cantidad, precio_total) VALUES (?, ?, ?, ?)',
        [usuario_id, item.id, item.cantidad, precioTotal]
      );

      await connection.query(
        'UPDATE productos SET stock = GREATEST(stock - ?, 0) WHERE id = ?',
        [item.cantidad, item.id]
      );
    }


    await connection.commit();
    res.status(201).json({ message: 'Venta registrada exitosamente' });
  } catch (error) {
    await connection.rollback();
    console.error('Error al registrar venta:', error);
    if (String(error.message).startsWith('Stock insuficiente') || String(error.message).includes('ya no existe')) {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: 'Error interno del servidor al procesar la compra' });
  } finally {
    connection.release();
  }
});

module.exports = router;
