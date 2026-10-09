const listarUsuarios = require("../services/usuariosService.js")
const mostrarRutaUsuarios = async (req,res)=>{
    try{
        const usuarios = await listarUsuarios()
        res.json(usuarios)
    } catch(error){
        res.status(500).json({mensaje : "Error al comunucarse con la base de datos",Error:error.message})
    }
    res.json({mensaje:"Estos son los usuarios"})
}

//ruta de registrarse
const registrarController = async (req,res)=>{
    res.json({mensaje:"Ruta para registrarme"})
}

//ruta de login
const loginController = async (req,res)=>{
    res.json({mensaje:"Ruta para iniciar sesion"})
}
module.exports = {mostrarRutaUsuarios,registrarController,loginController}