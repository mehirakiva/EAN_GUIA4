const pool = require('../config/db');

class Transportadora {
  static async getAll() {
    const [rows] = await pool.query(`
      SELECT t.*, COUNT(p.id) as total_pedidos 
      FROM transportadoras t
      LEFT JOIN pedidos p ON p.transportadora_id = t.id
      GROUP BY t.id
      ORDER BY t.nombre_transportadora
    `);
    return rows;
  }

  static async create(transportadora) {
    const [result] = await pool.query(
      'INSERT INTO transportadoras (nombre_transportadora) VALUES (?)',
      [transportadora.nombre_transportadora]
    );
    return result.insertId; // Retorna el ID de la nueva transportadora
  }

    
  static async getById(id) {
    const [rows] = await pool.query(`
      SELECT t.*, COUNT(p.id) as total_pedidos 
      FROM transportadoras t
      LEFT JOIN pedidos p ON p.transportadora_id = t.id
      WHERE t.id = ?
      GROUP BY t.id
    `, [id]);
    return rows[0];
  }

  static async update(id, transportadora) {
    const [result] = await pool.query(
      'UPDATE transportadoras SET nombre_transportadora = ? WHERE id = ?',
      [transportadora.nombre_transportadora, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      
      // Primero verificar si hay pedidos asociados
      const [pedidos] = await connection.query(
        'SELECT id FROM pedidos WHERE transportadora_id = ? LIMIT 1',
        [id]
      );
      
      if (pedidos.length > 0) {
        throw new Error('Existen pedidos asociados a esta transportadora');
      }
      
      // Si no hay pedidos, proceder con la eliminación
      const [result] = await connection.query(
        'DELETE FROM transportadoras WHERE id = ?',
        [id]
      );
      
      await connection.commit();
      return result.affectedRows > 0;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
 
}

module.exports = Transportadora;