const express = require('express');
const app = express();
require('dotenv').config();

const jwt = require('jsonwebtoken');

// Configuración del puerto
// (antes decía process.env.PORT, pero en el .env la variable se llama PUERTO,
// por eso el servidor siempre usaba el valor por defecto)
const port = process.env.PUERTO || 3030;

// Importación de Middlewares
const registroMiddleware = require("./middleware/registromiddleware");
const manejoErrores = require("./middleware/manejadorErrores");
const autenticacion = require("./middleware/autenticacion");

// Middlewares para recibir JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para mostrar información de las peticiones
app.use((req, res, next) => {
    console.log(`Tiempo milisegundos: ${Date.now()}`);
    console.log(`Fecha: ${new Date().toISOString()}`);
    next();
});

// Middleware de registro
app.use(registroMiddleware);

// Módulos para manejo de archivos
const sistemaArchivo = require('fs');
const ruta = require('path');
const rutaArchivo = ruta.join(__dirname, 'datos.json');

// Configuración de Multer
const multer = require('multer');

// La carpeta de imágenes no existía en el proyecto, por lo que Multer
// fallaba (ENOENT) al intentar subir cualquier archivo. La creamos si
// no existe antes de configurar el almacenamiento.
const carpetaImagenes = ruta.join(__dirname, 'misImagenes');
if (!sistemaArchivo.existsSync(carpetaImagenes)) {
    sistemaArchivo.mkdirSync(carpetaImagenes, { recursive: true });
}

const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'misImagenes/');
    },

    filename: (req, file, cb) => {
        const extension = ruta.extname(file.originalname);
        cb(null, `${Date.now()}${extension}`);
    }
});

const cargar = multer({
    storage: almacenamiento
});

// ==========================================
// RUTA BASE
// ==========================================

app.get("/", (req, res) => {
    res.status(200).send("API REST APRENDICES");
});

// ==========================================
// LISTAR TODOS LOS APRENDICES
// ==========================================

app.get("/api/aprendices", (req, res, next) => {

    sistemaArchivo.readFile(rutaArchivo, "utf-8", (error, datos) => {

        if (error) {
            return next(error);
        }

        try {

            const listaAprendices = datos
                ? JSON.parse(datos)
                : [];

            res.status(200).json({
                mensaje: listaAprendices
            });

        } catch (error) {
            next(error);
        }

    });

});

// ==========================================
// LISTAR UN APRENDIZ POR ID
// ==========================================

app.get("/api/aprendices/:id", (req, res, next) => {

    const id = Number(req.params.id);

    sistemaArchivo.readFile(rutaArchivo, "utf-8", (error, datos) => {

        if (error) {
            return next(error);
        }

        try {

            const listaAprendices = datos ? JSON.parse(datos) : [];
            const aprendiz = listaAprendices.find((a) => a.id === id);

            if (!aprendiz) {
                return res.status(404).json({
                    mensaje: `No se encontró un aprendiz con id ${id}`
                });
            }

            res.status(200).json({
                mensaje: aprendiz
            });

        } catch (error) {
            next(error);
        }

    });

});

// ==========================================
// CREAR UN APRENDIZ CON IMAGEN
// ==========================================

app.post("/api/aprendices", cargar.single("imagen"), (req, res, next) => {

    const nuevoAprendiz = req.body;

    nuevoAprendiz.imagen = req.file
        ? `/misImagenes/${req.file.filename}`
        : "sin imagen";

    sistemaArchivo.readFile(
        rutaArchivo,
        "utf-8",
        (error, datos) => {

            let listaAprendices = [];

            if (!error && datos) {

                try {
                    listaAprendices = JSON.parse(datos);
                } catch (error) {
                    return next(error);
                }

            }

            // Generamos un id autoincremental (antes los registros
            // se guardaban sin id, lo que hacía imposible buscarlos,
            // actualizarlos o borrarlos por id).
            const idsExistentes = listaAprendices
                .map((a) => a.id)
                .filter((id) => typeof id === "number");

            nuevoAprendiz.id = idsExistentes.length
                ? Math.max(...idsExistentes) + 1
                : 1;

            listaAprendices.push(nuevoAprendiz);

            sistemaArchivo.writeFile(
                rutaArchivo,
                JSON.stringify(listaAprendices, null, 2),
                (error) => {

                    if (error) {
                        return next(error);
                    }

                    res.status(201).json({
                        mensaje: "Aprendiz creado",
                        datosAprendiz: nuevoAprendiz
                    });

                }
            );

        }
    );

});

// ==========================================
// ACTUALIZAR UN APRENDIZ
// ==========================================

app.put("/api/aprendices/:id", (req, res, next) => {

    const id = Number(req.params.id);

    sistemaArchivo.readFile(rutaArchivo, "utf-8", (error, datos) => {

        if (error) {
            return next(error);
        }

        try {

            const listaAprendices = datos ? JSON.parse(datos) : [];
            const indice = listaAprendices.findIndex((a) => a.id === id);

            if (indice === -1) {
                return res.status(404).json({
                    mensaje: `No se encontró un aprendiz con id ${id}`
                });
            }

            listaAprendices[indice] = {
                ...listaAprendices[indice],
                ...req.body,
                id
            };

            sistemaArchivo.writeFile(
                rutaArchivo,
                JSON.stringify(listaAprendices, null, 2),
                (error) => {

                    if (error) {
                        return next(error);
                    }

                    res.status(200).json({
                        mensaje: "Aprendiz actualizado",
                        datosAprendiz: listaAprendices[indice]
                    });

                }
            );

        } catch (error) {
            next(error);
        }

    });

});

// ==========================================
// SIMULAR ERROR
// ==========================================

app.get("/error", (req, res, next) => {

    next(new Error("Error intencional de mi app"));

});

// ==========================================
// ELIMINAR UN APRENDIZ
// ==========================================

app.delete("/api/aprendices/:id", (req, res, next) => {

    const id = Number(req.params.id);

    sistemaArchivo.readFile(rutaArchivo, "utf-8", (error, datos) => {

        if (error) {
            return next(error);
        }

        try {

            const listaAprendices = datos ? JSON.parse(datos) : [];
            const existe = listaAprendices.some((a) => a.id === id);

            if (!existe) {
                return res.status(404).json({
                    mensaje: `No se encontró un aprendiz con id ${id}`
                });
            }

            const listaActualizada = listaAprendices.filter(
                (a) => a.id !== id
            );

            sistemaArchivo.writeFile(
                rutaArchivo,
                JSON.stringify(listaActualizada, null, 2),
                (error) => {

                    if (error) {
                        return next(error);
                    }

                    res.status(200).json({
                        mensaje: `Aprendiz con id ${id} eliminado`
                    });

                }
            );

        } catch (error) {
            next(error);
        }

    });

});

// ==========================================
// RUTA JSON
// ==========================================

app.post("/rutaJson", (req, res) => {

    const todosDatos = req.body;
    const edad = Number(req.body.edad2);

    if (edad >= 18) {

        res.status(200).json({
            mensaje: "Es mayor de edad"
        });

    } else {

        res.status(200).json({
            datosJson: todosDatos
        });

    }

});

// ==========================================
// RUTA FORMULARIO
// ==========================================

app.post("/rutaFormulario", (req, res) => {

    const todosDatos = req.body;
    const programa = req.body.programa;

    res.status(200).json({
        todosDatos: todosDatos,
        Miprograma: programa
    });

});

// ==========================================
// RUTA PROTEGIDA
// ==========================================

app.get(
    "/api/rutaprotegida",
    autenticacion,
    (req, res) => {

        res.status(200).json({
            mensaje: "Esta es mi ruta protegida |||",
            usuario: req.usuario
        });

    }
);

// ==========================================
// LOGIN
// ==========================================

app.post("/api/login", (req, res, next) => {

    try {

        const usuarioBd = {
            usuario: "Santiago",
            clave: "abc123"
        };

        const { usuario, clave } = req.body;

        // Validar usuario y contraseña
        if (
            usuario !== usuarioBd.usuario ||
            clave !== usuarioBd.clave
        ) {

            return res.status(400).json({
                mensaje: "Credenciales no válidas"
            });

        }

        // Verificar JWT_SECRET
        if (!process.env.JWT_SECRET) {

            return res.status(500).json({
                mensaje: "No se ha configurado JWT_SECRET en el archivo .env"
            });

        }

        // Crear token
        const token = jwt.sign(
            {
                usuario: usuario
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        // Enviar respuesta
        res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            token: token
        });

    } catch (error) {

        next(error);

    }

});

// ==========================================
// MANEJADOR DE ERRORES
// DEBE IR AL FINAL
// ==========================================

app.use(manejoErrores);

// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(port, () => {

    console.log(`SERVIDOR: http://localhost:${port}`);

});