const pool = require('../config/db');

class ReporteModel {
  static async getAll() {
    const query = `
      SELECT rep.id_reporte, rep.fecha, rep.tipo_problema, rep.descripcion, rep.estado,
             u.nombre || ' ' || u.apellido AS usuario, m.nombre AS material
      FROM reporte rep
      JOIN usuario u ON rep.id_usuario = u.id_usuario
      JOIN material m ON rep.id_material = m.id_material
      ORDER BY rep.id_reporte ASC;
    `;
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getById(id) {
    const query = `
      SELECT rep.id_reporte, rep.fecha, rep.tipo_problema, rep.descripcion, rep.estado,
             u.nombre || ' ' || u.apellido AS usuario, m.nombre AS material
      FROM reporte rep
      JOIN usuario u ON rep.id_usuario = u.id_usuario
      JOIN material m ON rep.id_material = m.id_material
      WHERE rep.id_reporte = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async create(tipo_problema, descripcion, estado, id_usuario, id_material) {
    const query = `
      INSERT INTO reporte (tipo_problema, descripcion, estado, id_usuario, id_material)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const { rows } = await pool.query(query, [tipo_problema, descripcion, estado, id_usuario, id_material]);
    return rows[0];
  }

  static async update(id, tipo_problema, descripcion, estado) {
    const query = `
      UPDATE reporte
      SET tipo_problema = $1, descripcion = $2, estado = $3
      WHERE id_reporte = $4 RETURNING *;
    `;
    const { rows } = await pool.query(query, [tipo_problema, descripcion, estado, id]);
    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM reporte WHERE id_reporte = $1 RETURNING *;', [id]);
    return rows[0];
  }
}

module.exports = ReporteModel;