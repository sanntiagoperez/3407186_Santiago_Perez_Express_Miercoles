//importar mi aplicacion app
const app =require("./app")

//verificar puerto de las variables de entorno
const PUERTO = process.send.PUERTO || 3333

//imprimo por consola el link del servidor 
app.listen(PUERTO,()=>{
    console.log (`MI SERVIDOR: http://localhost:${PUERTO}`)
})