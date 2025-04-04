const pool = require('../config/db');

class Ruta {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM rutas ORDER BY created_at DESC');
    return rows;
  }

  static async create(ruta) {
    const [result] = await pool.query(
      'INSERT INTO rutas (ruta_origen, ruta_descanso, ruta_destino, ruta_llegada) VALUES (?, ?, ?, ?)',
      [ruta.ruta_origen, ruta.ruta_descanso, ruta.ruta_destino, ruta.ruta_llegada]
    );
    return result.insertId;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM rutas WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, ruta) {
    await pool.query(
      'UPDATE rutas SET ruta_origen = ?, ruta_descanso = ?, ruta_destino = ?, ruta_llegada = ? WHERE id = ?',
      [ruta.ruta_origen, ruta.ruta_descanso, ruta.ruta_destino, ruta.ruta_llegada, id]
    );
  }

  static async delete(id) {
    await pool.query('DELETE FROM rutas WHERE id = ?', [id]);
  }
}

module.exports = Ruta;