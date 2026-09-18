// ruta de solo prueba
import { Router } from 'express';
const enrutador = Router(); 
const mostrarRuta = ("../controllers/pruebaController.js");

//funcion (req, res) debe ir en el controlador
enrutador.get('/rutaPersonal', (req, res) => {
    res.json({
        mensaje: "Ruta de prueba personal y ruta prueba"
    });
});

// exportar el enrutador para poder usarlo en app.js
export default enrutador;
