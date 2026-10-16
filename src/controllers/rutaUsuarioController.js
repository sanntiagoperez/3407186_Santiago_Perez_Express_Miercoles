const { listarUsuarios } = require("../services/usuariosService.js");

const mostrarRutaUsuarios = async (req, res) => {
    try {
        const usuarios = await listarUsuarios();
        return res.json(usuarios);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al comunicarse con la base de datos",
            error: error.message
        });
    }
};

const registrarController = async (req, res) => {
    return res.json({
        mensaje: "Ruta para registrarme"
    });
};

const loginController = async (req, res) => {
    return res.json({
        mensaje: "Ruta para iniciar sesión"
    });
};

module.exports = {
    mostrarRutaUsuarios,
    registrarController,
    loginController
};