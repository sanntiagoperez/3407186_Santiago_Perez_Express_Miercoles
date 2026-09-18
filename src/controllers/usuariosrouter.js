import { Router } from 'express';
const router = Router();

// Ruta para listar usuarios (GET http://localhost:3333/api/usuarios)
router.get('/', (req, res) => {
    const listaUsuarios = [
        { id: 1, nombre: "Santiago Pérez", email: "santiago@ejemplo.com" },
        { id: 2, nombre: "Elena Gómez", email: "elena@ejemplo.com" }
    ];

    res.json({
        mensaje: "Lista de usuarios obtenida con éxito desde controllers",
        usuarios: listaUsuarios
    });
});

export default router;
