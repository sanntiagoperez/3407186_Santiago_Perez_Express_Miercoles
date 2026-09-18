import { Router } from 'express';
const enrutador = Router();

// Importar el controlador subiendo un nivel (..) hasta la carpeta controllers
import mostrarRuta from '../controllers/pruebacontrollers.js';

// Usar la función del controlador en la ruta
enrutador.get('/rutaPersonal', mostrarRuta);

export default enrutador;
