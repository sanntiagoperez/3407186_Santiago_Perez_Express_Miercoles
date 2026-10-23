
const ormPrisma = require("../config/conexion");
const bcrypt = require("bcryptjs");

// LISTAR todos los usuarios
const listarUsuarios = async () => {
    return await ormPrisma.usuarios.findMany();
};

// BUSCAR usuario por ID
const buscarUsuario = async (id) => {
    return await ormPrisma.usuarios.findUnique({
        where: { id: Number(id) }
    });
};

// CREAR usuario
const crear = async (userData) => {
    const { email, name, clave } = userData;

    const claveHashe = await bcrypt.hash(clave, 10);

    return await ormPrisma.usuarios.create({
        data: {
            email,
            name,
            clave: claveHashe
        }
    });
};

// ACTUALIZAR usuario
const actualizar = async (id, userData) => {
    const data = {};

    if (userData.email !== undefined) {
        data.email = userData.email;
    }

    if (userData.name !== undefined) {
        data.name = userData.name;
    }

    if (userData.clave !== undefined) {
        data.clave = await bcrypt.hash(userData.clave, 10);
    }

    return await ormPrisma.usuarios.update({
        where: { id: Number(id) },
        data
    });
};

// ELIMINAR usuario
const eliminar = async (id) => {
    return await ormPrisma.usuarios.delete({
        where: { id: Number(id) }
    });
};

module.exports = {
    listarUsuarios,
    buscarUsuario,
    crear,
    actualizar,
    eliminar
};
