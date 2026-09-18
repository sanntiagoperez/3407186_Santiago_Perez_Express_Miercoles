// agrupar las rutas de mi aplicacion
import { Router } from 'express';

const router = Router();



// Importar los enrutadores con la sintaxis ES Modules (¡mantén el .js!)
import pruebaRouter from './pruebarouter.js';
// import usuariosRouter from './usuariosRouter.js'; // Descomenta cuando crees este archivo

// Usamos 'router' que es la variable declarada arriba
router.use("/rutaPrueba", pruebaRouter);

// ejemplo (añadida la barra '/' que faltaba en la ruta)
// router.use("/usuarios", usuariosRouter);

// Exportar usando la nueva sintaxis
export default router;

