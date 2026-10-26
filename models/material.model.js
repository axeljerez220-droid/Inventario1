

const pool = require('../config/db');

class MaterialModel {
    static async getAll() {
        try {
            const consulta = `
                SELECT
                    m.*,
                    c.nombre AS categoria,
                    u.nombre AS ubicacion
                FROM material m
                LEFT JOIN categoria c
                    ON m.id_categoria = c.id_categoria
                LEFT JOIN ubicacion u
                    ON m.id_ubicacion = u.id_ubicacion
                ORDER BY m.id_material ASC;
            `;

            const { rows } = await pool.query(consulta);
            return rows;
        } catch (error) {
            console.error('ERROR material.getAll:', error);
            throw error;
        }
    }

    static async getById(id) {
        try {
            const consulta = `
                SELECT
                    m.*,
                    c.nombre AS categoria,
                    u.nombre AS ubicacion
                FROM material m
                LEFT JOIN categoria c
                    ON m.id_categoria = c.id_categoria
                LEFT JOIN ubicacion u
                    ON m.id_ubicacion = u.id_ubicacion
                WHERE m.id_material = $1;
            `;

            const { rows } = await pool.query(consulta, [id]);
            return rows[0];
        } catch (error) {
            console.error('ERROR material.getById:', error);
            throw error;
        }
    }

    static async create(material) {
        try {
            const {
                nombre,
                descripcion,
                cantidad,
                estado,
                id_categoria,
                id_ubicacion
            } = material;

            const consulta = `
                INSERT INTO material (
                    nombre,
                    descripcion,
                    cantidad,
                    estado,
                    id_categoria,
                    id_ubicacion
                )
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *;
            `;

            const valores = [
                nombre,
                descripcion,
                cantidad,
                estado,
                id_categoria,
                id_ubicacion
            ];

            const { rows } = await pool.query(consulta, valores);
            return rows[0];
        } catch (error) {
            console.error('ERROR material.create:', error);
            throw error;
        }
    }

    static async update(id, material) {
        try {
            const {
                nombre,
                descripcion,
                cantidad,
                estado,
                id_categoria,
                id_ubicacion
            } = material;

            const consulta = `
                UPDATE material
                SET nombre = $1,
                    descripcion = $2,
                    cantidad = $3,
                    estado = $4,
                    id_categoria = $5,
                    id_ubicacion = $6
                WHERE id_material = $7
                RETURNING *;
            `;

            const valores = [
                nombre,
                descripcion,
                cantidad,
                estado,
                id_categoria,
                id_ubicacion,
                id
            ];

            const { rows } = await pool.query(consulta, valores);
            return rows[0];
        } catch (error) {
            console.error('ERROR material.update:', error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const consulta = `
                DELETE FROM material
                WHERE id_material = $1
                RETURNING *;
            `;

            const { rows } = await pool.query(consulta, [id]);
            return rows[0];
        } catch (error) {
            console.error('ERROR material.delete:', error);
            throw error;
        }
    }
}

module.exports = MaterialModel;
