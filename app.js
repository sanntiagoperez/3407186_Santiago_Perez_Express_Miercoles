import express from "express";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.send("Aprendiz ficha 3407186");
});

app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});