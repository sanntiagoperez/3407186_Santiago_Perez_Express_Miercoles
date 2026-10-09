//agrupa las rutas de mi aplicacion (usuarios,productos, notas, citas)

const {Router}= require ("express")
const enrutador = Router() 
const pruebarouter =require("./pruebarouter")
const usuariosrouter =require("./usuariosrouter")

enrutador.use("/rutaPrueba", pruebarouter)
enrutador.use("/usuario", usuariosrouter)

module.exports = enrutador