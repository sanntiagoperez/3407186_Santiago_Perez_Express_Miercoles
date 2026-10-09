const validacionAprendiz =(req, res, next) => {
    const { nombre, edad, ficha, sede, correo } = req.body
     // VALIDACIÓN DEL NOMBRE
    if (!nombre) {
        return res.status(400).json({
            mensaje: "No se puede crear el aprendiz porque el nombre es obligatorio. Digítalo."
        })
    }

    if (typeof nombre !== "string") {
        return res.status(400).json({
            mensaje: "El nombre debe ser texto."
        })
    }

    // VALIDACIÓN DE LA FICHA
    if (!ficha) {
        return res.status(400).json({
            mensaje: "No hay ninguna ficha. No se puede crear el aprendiz. Digítala."
        })
    }

    if (typeof ficha !== "number") {
        return res.status(400).json({
            mensaje: "La ficha debe ser un número."
        })
    }

    // VALIDACIÓN DE LA SEDE
    if (!sede) {
        return res.status(400).json({
            mensaje: "No hay una sede registrada. Regístrala para poder ingresar."
        })
    }

    if (typeof sede !== "string") {
        return res.status(400).json({
            mensaje: "La sede debe ser texto."
        })
    }

    // VALIDACIÓN DEL CORREO
    if (!correo) {
        return res.status(400).json({
            mensaje: "El correo es obligatorio. Digítalo."
        })
    }

    if (!/^[^\s@]+@sena\.edu\.co$/.test(correo)) {
    return res.status(400).json({
        mensaje: "El correo debe tener un formato válido y terminar en @sena.edu.co"
    })
    }

    // VALIDACIÓN DE LA EDAD
    if (edad !== undefined && typeof edad !== "number") {
        return res.status(400).json({
            mensaje: "La edad debe ser un número."
        })
    }
    next()
}

module.exports = validacionAprendiz