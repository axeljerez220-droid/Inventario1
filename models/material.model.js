/*const pool = require('../config/db');

class MaterialModel {
  static async getAll() {
    const query = `
      SELECT m.id_material, m.nombre, m.descripcion, m.cantidad, m.estado, 
             c.nombre AS categoria, u.nombre AS ubicacion
      FROM material m
      JOIN categoria c ON m.id_categoria = c.id_categoria
      JOIN ubicacion u ON m.id_ubicacion = u.id_ubicacion
      ORDER BY m.id_material ASC;
    `;
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getById(id) {
    const query = `
      SELECT m.id_material, m.nombre, m.descripcion, m.cantidad, m.estado, 
             c.nombre AS categoria, u.nombre AS ubicacion
      FROM material m
      JOIN categoria c ON m.id_categoria = c.id_categoria
      JOIN ubicacion u ON m.id_ubicacion = u.id_ubicacion
      WHERE m.id_material = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async create(nombre, descripcion, cantidad, estado, id_categoria, id_ubicacion) {
    const query = `
      INSERT INTO material (nombre, descripcion, cantidad, estado, id_categoria, id_ubicacion)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
    const { rows } = await pool.query(query, [nombre, descripcion, cantidad, estado, id_categoria, id_ubicacion]);
    return rows[0];
  }

  static async update(id, nombre, descripcion, cantidad, estado, id_categoria, id_ubicacion) {
    const query = `
      UPDATE material
      SET nombre = $1, descripcion = $2, cantidad = $3, estado = $4, id_categoria = $5, id_ubicacion = $6
      WHERE id_material = $7 RETURNING *;
    `;
    const { rows } = await pool.query(query, [nombre, descripcion, cantidad, estado, id_categoria, id_ubicacion, id]);
    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM material WHERE id_material = $1 RETURNING *;', [id]);
    return rows[0];
  }
}

module.exports = MaterialModel;*/
const pool = require('../config/db');

class MaterialModel {
  static async getAll() {
    try {
      const { rows } = await pool.query('SELECT * FROM material ORDER BY id_material ASC;');
      return rows;
    } catch (error) {
      console.error('ERROR material.getAll:', error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      const { rows } = await pool.query('SELECT * FROM material WHERE id_material = $1;', [id]);
      return rows[0];
    } catch (error) {
      console.error('ERROR material.getById:', error);
      throw error;
    }
  }
}

module.exports = MaterialModel;