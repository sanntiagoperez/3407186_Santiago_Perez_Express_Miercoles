const mostrarRuta = async (req, res) => {
    res.json({
        mensaje: 'Esta es mi rutaPrueba y rutaPersonal con controller'
    });
};

module.exports = mostrarRuta