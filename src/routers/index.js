// agrupar las rutas de mi aplicacion
import { Router } from 'express';
const router = Router();

// Importar los enrutadores existentes respetando sus ubicaciones reales
import pruebaRouter from './pruebarouter.js';
import usuariosRouter from '../controllers/usuariosrouter.js'; // 🛠️ CORREGIDO: sube un nivel y entra a controllers

// Usamos los enrutadores
router.use("/rutaPrueba", pruebaRouter);
router.use("/usuarios", usuariosRouter);

// Exportar usando la nueva sintaxis
export default router;
