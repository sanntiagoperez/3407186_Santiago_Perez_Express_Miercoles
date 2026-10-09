//ruta de usuarios
const {Router}= require ("express")
const enrutador = Router()
const mostrarRutaUsuarios = require("../controllers/rutaUsuarioController")

//FUNCION (req,res) dbeer ir en el controlador
enrutador.get("/listado", mostrarRutaUsuarios)
//FUNCION (req,res) dbeer ir en el controlador

module.exports = enrutador