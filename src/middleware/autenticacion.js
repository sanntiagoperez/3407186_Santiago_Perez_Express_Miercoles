const jswtoken = require("jsonwebtoken");

const autenticacion = (req, res, next) => {

    // Obtener el token desde el encabezado
    const token = req.header("autenticar")?.split(" ")[1];

    // Verificar si existe el token
    if (!token) {
        return res.status(401).json({
            Error: "Acceso denegado, no se proporcionó token"
        });
    }

    // Verificar el token
    jswtoken.verify(
        token,
        process.env.JWT_SECRET,
        (error, usuario) => {

            if (error) {
                return res.status(403).json({
                    Error: "Token inválido o expirado"
                });
            }

            // Guardar la información del usuario
            req.usuario = usuario;

            // Continuar con la petición
            next();
        }
    );
};

module.exports = autenticacion;