require("dotenv").config()
const express = require("express")
//importar enrutador
const enrutador = require("./routers")

const app = express()

//usar middleware, formatear el body
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//importar el archivo enrutador(toda las rutas) de routers
app.use("/api", enrutador)

//endpoint raiz, de Bienvenida
app.get("/",(req, res)=>{
    res.send("API, REST Estructurado en capas")
})


module.exports = app