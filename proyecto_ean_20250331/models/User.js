const pool = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async create(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [user.name, user.email, hashedPassword, user.role || 'cliente']
    );
    return result.insertId;
  }

  static async getAll() {
    const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users');
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT id, name, email, role FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async getAll() {
    const [rows] = await pool.query('SELECT id, name, email, role FROM users');
    return rows;
  }

  static async update(id, user) {
    await pool.query(
      'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?',
      [user.name, user.email, user.role, id]
    );
  }

  static async getAll() {
    const [rows] = await pool.query(`
      SELECT id, name, email, role, 
      DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at 
      FROM users
    `);
    return rows;
  }
  
  static async delete(id) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      
      // Primero eliminar pedidos asociados
      await connection.query('DELETE FROM pedidos WHERE cliente_id = ?', [id]);
      
      // Luego eliminar el usuario
      const [result] = await connection.query('DELETE FROM users WHERE id = ?', [id]);
      
      await connection.commit();
      return result.affectedRows > 0;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = User;