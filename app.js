import express from "express";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();

const port = process.env.PUERTO || 3030;

// Ruta principal
app.get("/", (req, res) => {
    res.send("Aprendiz ficha 3407186 SENA");
});

// Ruta 1
app.get("/ruta1", (req, res) => {
    res.send("<h1>Usando res.send</h1>");
});

// Ruta 2
app.get("/ruta2", (req, res) => {
    res.json({
        dev: "node --watch app.js",
        script: "node app.js"
    });
});

// Ruta 3
app.get("/ruta3/:nombre/:apellido/:apellido2/:edad", (req, res) => {
    const nombreUsuario = req.params.nombre;
    const apellido = req.params.apellido;
    const apellido2 = req.params.apellido2;
    const edad = req.params.edad;

    res.json({
        usuario: nombreUsuario,
        apellido: apellido,
        apellido2: apellido2,
        edad: edad
    });
});

app.get("/ruta4", (req, res) => {
    //templates rutas dinamicas
    const numero = req.query.phone || 3228870585
    const orden = req.query.orden || "Sin orden"
    const pagina = req.query.pagina || 66
    res.send(`<h1>Listados de aprendices</h1>
        <h2>El listado orden: ${orden}</h2>
        <p>Pagina: ${pagina}</p>
        <h3>Numero: ${numero}</h3>
    `)
})
// Taller: Hacerlo 

// Iniciar servidor
app.listen(port, () => {
    console.log(`SERVIDOR: http://localhost:${port}`);
});