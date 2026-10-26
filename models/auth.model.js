
const pool = require('../config/db');

class AuthModel {
    static async buscarPorEmail(email) {
        const consulta = `
            SELECT
                u.id_usuario,
                u.nombre,
                u.apellido,
                u.email,
                u.contrasena,
                u.id_rol,
                r.nombre AS rol
            FROM usuario u
            INNER JOIN rol r ON u.id_rol = r.id_rol
            WHERE u.email = $1;
        `;

        const { rows } = await pool.query(consulta, [email]);
        return rows[0];
    }
}

module.exports = AuthModel;
