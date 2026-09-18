// funciones asincronicas y capturar errores try catch
const mostrarRuta = async (req, res) => {
    res.json({
        mensaje: "Esta rutaprueba y personal con controller"
    });
};

// Exportación moderna para ES Modules
export default mostrarRuta;
