
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthModel = require('../models/auth.model');

class AuthController {
    static async login(req, res) {
        try {
            const { email, contrasena } = req.body;

            // Validar que se hayan enviado las credenciales
            if (!email || !contrasena) {
                return res.status(400).json({
                    mensaje: 'Debés ingresar email y contraseña.'
                });
            }

            // Buscar al usuario por email
            const usuario = await AuthModel.buscarPorEmail(email);

            if (!usuario) {
                return res.status(401).json({
                    mensaje: 'Email o contraseña incorrectos.'
                });
            }

            // Comparar la contraseña ingresada con el hash almacenado
            const contrasenaValida = await bcrypt.compare(
                contrasena,
                usuario.contrasena
            );

            if (!contrasenaValida) {
                return res.status(401).json({
                    mensaje: 'Email o contraseña incorrectos.'
                });
            }

            // Generar el token JWT
            const token = jwt.sign(
                {
                    id_usuario: usuario.id_usuario,
                    id_rol: usuario.id_rol,
                    rol: usuario.rol
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
                }
            );

            // Devolver el token y los datos públicos del usuario
            return res.json({
                mensaje: 'Inicio de sesión exitoso.',
                token,
                usuario: {
                    id_usuario: usuario.id_usuario,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    email: usuario.email,
                    id_rol: usuario.id_rol,
                    rol: usuario.rol
                }
            });

        } catch (error) {
            console.error('Error en el login:', error);
            return res.status(500).json({
                mensaje: 'Error interno al iniciar sesión.'
            });
        }
    }
}

module.exports = AuthController;
