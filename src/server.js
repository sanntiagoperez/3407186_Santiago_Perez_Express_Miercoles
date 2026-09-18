// importar app.js (¡obligatorio el .js al final!)
import app from './app.js';

// verificar si el puerto de las variables del entorno
const PORT = process.env.PORT || 3333;

// imprimo por la consola
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
