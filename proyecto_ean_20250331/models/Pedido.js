const pool = require('../config/db');

class Pedido {
  static async getAll() {
    const [rows] = await pool.query(`
      SELECT p.*, u.name as cliente_nombre, t.nombre_transportadora 
      FROM pedidos p
      LEFT JOIN users u ON p.cliente_id = u.id
      LEFT JOIN transportadoras t ON p.transportadora_id = t.id
      ORDER BY p.fecha_pedido DESC
    `);
    return rows;
  }

  static async create(pedido) {
    const [result] = await pool.query(
      'INSERT INTO pedidos (producto, cliente_id, estado_pedido, transportadora_id, ruta, observaciones) VALUES (?, ?, ?, ?, ?, ?)',
      [pedido.producto, pedido.cliente_id, pedido.estado_pedido || 'pendiente', pedido.transportadora_id, pedido.ruta, pedido.observaciones]
    );
    return result.insertId;
  }

  static async getById(id) {
    const [rows] = await pool.query(`
      SELECT p.*, u.name as cliente_nombre, t.nombre_transportadora 
      FROM pedidos p
      LEFT JOIN users u ON p.cliente_id = u.id
      LEFT JOIN transportadoras t ON p.transportadora_id = t.id
      WHERE p.id = ?
    `, [id]);
    return rows[0];
  }

  static async update(id, pedido) {
    await pool.query(
      'UPDATE pedidos SET producto = ?, estado_pedido = ?, transportadora_id = ?, ruta = ?, observaciones = ? WHERE id = ?',
      [pedido.producto, pedido.estado_pedido, pedido.transportadora_id, pedido.ruta, pedido.observaciones, id]
    );
  }

  static async delete(id) {
    await pool.query('DELETE FROM pedidos WHERE id = ?', [id]);
  }

  static async getByClienteId(cliente_id) {
    const [rows] = await pool.query('SELECT * FROM pedidos WHERE cliente_id = ? ORDER BY fecha_pedido DESC', [cliente_id]);
    return rows;
  }

  static async getByClienteId(clienteId) {
    const [rows] = await pool.query(`
      SELECT p.*, t.nombre_transportadora, 
             (SELECT estado FROM estado_envio WHERE id_pedido = p.id ORDER BY fecha DESC LIMIT 1) as estado_envio
      FROM pedidos p
      LEFT JOIN transportadoras t ON p.transportadora_id = t.id
      WHERE p.cliente_id = ?
      ORDER BY p.fecha_pedido DESC
    `, [clienteId]);
    return rows;
  }
}




module.exports = Pedido;