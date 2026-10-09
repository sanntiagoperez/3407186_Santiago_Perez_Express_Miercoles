//ruta de usuarios
const {Router}= require ("express")
const enrutador = Router()
const {mostrarRutaUsuarios, registrarController, loginController} = require("../controllers/rutaUsuarioController")

//FUNCION (req,res) dbeer ir en el controlador
enrutador.get("/listado", mostrarRutaUsuarios)
enrutador.post("/registrar" , registrarController)
enrutador.post("/login", loginController)
module.exports = enrutador