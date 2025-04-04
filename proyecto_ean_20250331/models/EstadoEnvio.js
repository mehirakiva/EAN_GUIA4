const pool = require('../config/db');

class EstadoEnvio {
  static async getAll() {
    const [rows] = await pool.query(`
      SELECT e.*, 
        p.producto as producto_nombre,
        t.nombre_transportadora,
        u.name as cliente_nombre
      FROM estado_envio e
      JOIN pedidos p ON e.id_pedido = p.id
      JOIN transportadoras t ON e.transportadora_id = t.id
      JOIN users u ON e.cliente_id = u.id
      ORDER BY e.fecha DESC
    `);
    return rows;
  }

  static async create(estadoEnvio) {
    const [result] = await pool.query(
      'INSERT INTO estado_envio (id_pedido, transportadora_id, cliente_id, estado, observaciones) VALUES (?, ?, ?, ?, ?)',
      [estadoEnvio.id_pedido, estadoEnvio.transportadora_id, estadoEnvio.cliente_id, estadoEnvio.estado, estadoEnvio.observaciones]
    );
    return result.insertId;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM estado_envio WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, estadoEnvio) {
    await pool.query(
      'UPDATE estado_envio SET estado = ?, observaciones = ? WHERE id = ?',
      [estadoEnvio.estado, estadoEnvio.observaciones, id]
    );
  }

  static async delete(id) {
    await pool.query('DELETE FROM estado_envio WHERE id = ?', [id]);
  }

  static async getByPedidoId(pedidoId) {
    const [rows] = await pool.query('SELECT * FROM estado_envio WHERE id_pedido = ?', [pedidoId]);
    return rows;
  }
}

module.exports = EstadoEnvio;