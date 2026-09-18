import express from 'express';
const app = express();

// importar el enrutador de la carpeta 'routers'
import enrutador from './routers/index.js';

// usar el middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importar el archivo enrutador (todas las rutas) de routers
app.use('/api', enrutador);

// endpoint raiz
app.get('/', (req, res) => {
    res.send('Api estructurado por capas');
});

export default app;

