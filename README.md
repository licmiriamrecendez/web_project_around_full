# TripleTen — Alrededor de los EE. UU. (Full Stack)

## Descripción del proyecto

Aplicación web Full Stack desarrollada como parte del programa de Desarrollo Web de TripleTen.

Permite a los usuarios registrarse, iniciar sesión, editar su perfil, cambiar su avatar, publicar fotografías de lugares, dar likes y eliminar sus propias tarjetas.

El frontend está desarrollado con React y TypeScript, mientras que el backend utiliza Node.js, Express, MongoDB y Mongoose.

La aplicación implementa autenticación mediante JWT y almacena la información de los usuarios y las tarjetas en MongoDB Atlas.

## Aplicación publicada

**Frontend:** https://web-project-around-full-w3kw.vercel.app

**Backend:** https://web-project-around-full-azure.vercel.app

**Repositorio de GitHub:** https://github.com/licmiriamrecendez/web_project_around_full

## Funcionalidades

- Registro de nuevos usuarios.
- Inicio y cierre de sesión.
- Autenticación mediante JWT.
- Protección de rutas privadas.
- Persistencia de la sesión al actualizar la página.
- Visualización y edición del perfil.
- Actualización de la fotografía de perfil.
- Creación de tarjetas con fotografías y nombres de lugares.
- Visualización de las tarjetas almacenadas.
- Agregar y quitar likes a las tarjetas.
- Eliminar tarjetas propias con confirmación.
- Almacenamiento de usuarios y tarjetas en MongoDB Atlas.
- Comunicación entre el frontend y el backend mediante una API REST.
- Manejo de errores y validación de datos.

## Tecnologías y técnicas utilizadas

### Frontend

- React
- TypeScript
- Vite
- React Router
- HTML5 y CSS3
- Fetch API

### Backend

- Node.js
- Express
- TypeScript
- MongoDB y Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- Express Rate Limit
- CORS
- API REST

### Herramientas y despliegue

- Git y GitHub
- Visual Studio Code
- Postman
- MongoDB Atlas
- Vercel
- Variables de entorno
- Programación asíncrona con async/await

## Base de datos

La aplicación utiliza MongoDB Atlas como base de datos en la nube y Mongoose para gestionar los modelos y documentos.

Se almacenan dos tipos principales de información:

- **Usuarios:** nombre, descripción, correo electrónico, contraseña cifrada y avatar.
- **Tarjetas:** nombre del lugar, enlace de la imagen, propietario, likes y fecha de creación.

Cada tarjeta está asociada al usuario que la creó.

Las contraseñas se almacenan cifradas mediante bcrypt y la autenticación se realiza utilizando tokens JWT.

Los usuarios pueden crear tarjetas, dar likes y eliminar únicamente las tarjetas que les pertenecen.

Los datos permanecen almacenados después de cerrar sesión o actualizar la página.

## Rutas de la API

### Autenticación

`POST /signup`

Registra un nuevo usuario. La contraseña se cifra antes de almacenarse en MongoDB.

`POST /signin`

Permite iniciar sesión con correo electrónico y contraseña. Si las credenciales son correctas, devuelve un token JWT.

### Seguridad

- Las rutas de usuarios y tarjetas están protegidas mediante autenticación JWT.
- Las contraseñas se almacenan cifradas con bcrypt.
- Se utiliza Express Rate Limit para limitar los intentos de registro e inicio de sesión.
- El middleware de autenticación verifica los tokens antes de permitir el acceso a las rutas protegidas.
- Los usuarios solamente pueden eliminar sus propias tarjetas.

### Usuarios

`GET /users`

Devuelve la lista de usuarios.

`GET /users/:id`

Devuelve un usuario mediante su ID.

`GET /users/me`

Devuelve los datos del usuario autenticado.

`PATCH /users/me`

Actualiza el nombre y la descripción del usuario autenticado.

`PATCH /users/me/avatar`

Actualiza la fotografía de perfil del usuario autenticado.

**Nota:** Estas rutas requieren autenticación mediante JWT. El registro de nuevos usuarios se realiza mediante `POST /signup`.

### Tarjetas

`GET /cards`

Devuelve únicamente las tarjetas que pertenecen al usuario autenticado, ordenadas desde la más reciente hasta la más antigua.

`POST /cards`

Permite al usuario autenticado crear una nueva tarjeta.

`DELETE /cards/:id`

Elimina una tarjeta si pertenece al usuario autenticado.

`PUT /cards/:id/likes`

Agrega el like del usuario autenticado a una tarjeta.

`DELETE /cards/:id/likes`

Elimina el like del usuario autenticado de una tarjeta.

**Nota:** Todas estas rutas requieren autenticación mediante JWT.

## Manejo de errores

La API utiliza un middleware centralizado para gestionar los errores y devolver respuestas HTTP apropiadas.

Los principales códigos de respuesta son:

- `400` — Datos inválidos o identificadores con formato incorrecto.
- `401` — Usuario no autenticado, token inválido o credenciales incorrectas.
- `403` — El usuario no tiene permiso para realizar la operación.
- `404` — Usuario, tarjeta o recurso no encontrado.
- `409` — El correo electrónico ya está registrado.
- `429` — Se ha superado el límite de solicitudes permitido.
- `500` — Error interno del servidor.

La aplicación también incluye validaciones para evitar operaciones no autorizadas y proteger la información de los usuarios.

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/licmiriamrecendez/web_project_around_full.git
cd web_project_around_full
```

### 2. Instalar las dependencias

```bash
npm run install:all
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` dentro de la carpeta `server`, tomando como referencia `.env.example`.

Configurar las siguientes variables:

- `MONGO_URI`: cadena de conexión a MongoDB.
- `JWT_SECRET`: clave secreta para generar y verificar tokens JWT.
- `PORT`: puerto del servidor.
- `CLIENT_ORIGIN`: dirección del frontend autorizado.

En la carpeta `client`, configurar:

- `VITE_API_URL`: dirección del backend.

No incluir contraseñas ni claves reales en el repositorio.

### 4. Iniciar el backend

```bash
npm run dev:server
```

### 5. Iniciar el frontend

En otra terminal:

```bash
npm run dev:client
```

### 6. Abrir la aplicación

Acceder desde el navegador a:

http://localhost:5173

El backend se ejecuta localmente en:

http://localhost:3001
