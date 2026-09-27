# Around The U.S. — Full Stack

## Descripción

Around The U.S. es una aplicación web full stack desarrollada como parte del programa de Desarrollo Web de TripleTen.

La aplicación permite a los usuarios registrarse e iniciar sesión para acceder a un perfil personal y a una galería de tarjetas de lugares Around The U.S.

El front end está desarrollado con React y TypeScript, mientras que el back end utiliza Express, TypeScript, MongoDB y Mongoose.

## Funcionalidad

- Registro de nuevos usuarios.
- Inicio y cierre de sesión.
- Persistencia de la sesión mediante un token almacenado en localStorage.
- Protección de rutas para usuarios no autenticados.
- Visualización y edición del perfil del usuario.
- Actualización del avatar.
- Creación de nuevas tarjetas.
- Eliminación de tarjetas propias.
- Dar y quitar "Me gusta" a las tarjetas.
- Visualización de imágenes en ventanas emergentes.
- Comunicación entre el front end y la API.
- Almacenamiento de datos en MongoDB.

## Tecnologías utilizadas

- React
- TypeScript
- React Router
- Vite
- Node.js
- Express
- MongoDB
- Mongoose
- HTML5
- CSS3
- REST API
- Git

## Estructura del proyecto

El proyecto está dividido en dos partes principales:

- `client/`: aplicación front end desarrollada con React y TypeScript.
- `server/`: API desarrollada con Express, TypeScript y MongoDB.

## Ejecución del proyecto

Instalar las dependencias del cliente y del servidor:

    npm run install:all

Iniciar el servidor:

    npm run dev:server

Iniciar el cliente en otra terminal:

    npm run dev:client

El cliente se ejecuta en:

    http://localhost:3000

El servidor se ejecuta en:

    http://localhost:3001
