# Introducción a Express.js

## Información del Aprendiz

- **Nombre:** Santiago Pérez
- **Programa:** Análisis y Desarrollo de Software (ADSO)
- **Centro de Formación:** Centro de Gestión de Mercados, Logística y TIC (CGMLTI)
- **Ficha:** 3407186

---

# Descripción

Este proyecto corresponde a la actividad de introducción al framework **Express.js** utilizando **Node.js**. Se realizó la configuración inicial del entorno de desarrollo, la instalación de las dependencias necesarias, la inicialización del repositorio Git y la creación de un servidor web básico.

---

# Tecnologías utilizadas

- Node.js v24.18.1
- npm v11.16.0
- Express.js
- Git
- Visual Studio Code

---

# Instalación

1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

2. Entrar a la carpeta

```bash
cd intro-express-js-santiago-perez
```

3. Instalar las dependencias

```bash
npm install
```

---

# Ejecutar el proyecto

```bash
node app.js
```

El servidor iniciará en:

```
http://localhost:3000
```

---

# Estructura del proyecto

```
intro-express-js-santiago-perez/
│
├── node_modules/
├── .gitignore
├── package.json
├── package-lock.json
├── app.js
└── README.md
```

---

# Código principal

```javascript
import express from "express";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.send("Aprendiz ficha 3407186");
});

app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});
```

---

# Gestores de paquetes para Node.js

| Gestor | Ventajas | Desventajas |
|---------|----------|-------------|
| npm | Instalado por defecto con Node.js, gran comunidad y amplio ecosistema. | Puede ser más lento en proyectos grandes. |
| Yarn | Instalación rápida, manejo eficiente del caché y bloqueo de dependencias. | Requiere instalación adicional. |
| pnpm | Muy rápido y optimiza el espacio en disco mediante enlaces simbólicos. | Algunos proyectos antiguos pueden presentar incompatibilidades. |

---

# CommonJS vs ES Modules

## CommonJS

Utiliza la función:

```javascript
const express = require("express");
```

Es el sistema de módulos tradicional de Node.js.

### Ventajas

- Amplia compatibilidad.
- Muy utilizado en proyectos existentes.

---

## ES Modules

Utiliza la sintaxis:

```javascript
import express from "express";
```

Es el estándar moderno de JavaScript.

### Ventajas

- Sintaxis más limpia.
- Compatible con navegadores modernos.
- Facilita la interoperabilidad con herramientas actuales.

---

# Evidencia de funcionamiento

Al ejecutar:

```bash
node app.js
```

La consola muestra:

```
Servidor funcionando en el puerto 3000
```

Y al ingresar a:

```
http://localhost:3000
```

Se visualiza el mensaje:

```
Aprendiz ficha 3407186
```

---

# Autor

**Santiago Pérez**

ADSO – SENA

2026