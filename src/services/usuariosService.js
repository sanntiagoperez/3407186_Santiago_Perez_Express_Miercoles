const ormPrisma = require("../config/conexion");

const listarUsuarios = async () => {
    const usuarios = await ormPrisma.usuarios.findMany(); // 'M' mayúscula
    return usuarios;
};

module.exports = { listarUsuarios };