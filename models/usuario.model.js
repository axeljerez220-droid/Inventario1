
const pool = require('../config/db');

class UsuarioModel {
    static async getAll() {
        const consulta = `
            SELECT
                u.id_usuario,
                u.nombre,
                u.apellido,
                u.email,
                u.id_rol,
                r.nombre AS rol
            FROM usuario u
            LEFT JOIN rol r ON u.id_rol = r.id_rol
            ORDER BY u.id_usuario ASC;
        `;

        const { rows } = await pool.query(consulta);
        return rows;
    }

    static async getById(id) {
        const consulta = `
            SELECT
                u.id_usuario,
                u.nombre,
                u.apellido,
                u.email,
                u.id_rol,
                r.nombre AS rol
            FROM usuario u
            LEFT JOIN rol r ON u.id_rol = r.id_rol
            WHERE u.id_usuario = $1;
        `;

        const { rows } = await pool.query(consulta, [id]);
        return rows[0];
    }

    static async create(nombre, apellido, email, contrasena, id_rol) {
        const consulta = `
            INSERT INTO usuario
                (nombre, apellido, email, contrasena, id_rol)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING
                id_usuario, nombre, apellido, email, id_rol;
        `;

        const valores = [nombre, apellido, email, contrasena, id_rol];
        const { rows } = await pool.query(consulta, valores);
        return rows[0];
    }

    static async update(id, nombre, apellido, email, contrasena, id_rol) {
        const consulta = `
            UPDATE usuario
            SET nombre = $1,
                apellido = $2,
                email = $3,
                contrasena = $4,
                id_rol = $5
            WHERE id_usuario = $6
            RETURNING
                id_usuario, nombre, apellido, email, id_rol;
        `;

        const valores = [
            nombre, apellido, email, contrasena, id_rol, id
        ];

        const { rows } = await pool.query(consulta, valores);
        return rows[0];
    }

    static async delete(id) {
        const consulta = `
            DELETE FROM usuario
            WHERE id_usuario = $1
            RETURNING id_usuario, nombre, apellido, email, id_rol;
        `;

        const { rows } = await pool.query(consulta, [id]);
        return rows[0];
    }
}

module.exports = UsuarioModel;
