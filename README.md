# Inventario de Laboratorio — Backend

Backend desarrollado como proyecto educativo para gestionar el inventario de un laboratorio.

El proyecto implementa una API REST con JavaScript, Node.js y Express, utilizando la arquitectura MVC (Modelo - Vista - Controlador).

Permite que un frontend consulte y gestione materiales, categorías, ubicaciones, usuarios, solicitudes, movimientos de stock, reportes y notificaciones.

Actualmente, el proyecto utiliza PostgreSQL como sistema gestor de base de datos.

## Objetivo del proyecto

El proyecto fue desarrollado principalmente con fines educativos, para comprender cómo se construye un backend y cómo se comunica con un frontend en una aplicación de gestión de inventario.

A través de este proyecto se trabajan conceptos como:

- Desarrollo de aplicaciones backend.
- Node.js y Express.
- Arquitectura MVC.
- APIs REST, rutas, endpoints y métodos HTTP.
- Controladores y modelos.
- PostgreSQL y consultas SQL.
- Formato JSON.
- Comunicación entre frontend y backend.
- Gestión de inventario.

## Tecnologías


| Tecnología | Uso |
| --- | --- |
| JavaScript | Lenguaje utilizado para desarrollar el backend. |
| Node.js | Entorno de ejecución de JavaScript. |
| Express | Framework utilizado para construir el servidor y la API. |
| MVC | Arquitectura utilizada para organizar el proyecto. |
| PostgreSQL | Motor de base de datos. |
| `pg` | Biblioteca que permite conectar Node.js con PostgreSQL. |
| `dotenv` | Biblioteca para cargar variables de entorno. |
| Postman | Herramienta incluida en la configuración del proyecto para probar la API. |
| Git / GitHub | Control de versiones recomendado para el proyecto. |

## Próxima etapa

Como posible etapa posterior, la base de datos PostgreSQL podría migrarse a un servicio remoto como Supabase. Esto permitiría mantener PostgreSQL y disponer de una base de datos accesible desde Internet.

## Arquitectura MVC

El proyecto utiliza la arquitectura MVC (Model - View - Controller), que permite separar las responsabilidades de cada componente.

En este proyecto, el backend actúa como intermediario entre el frontend y la base de datos.

- **Modelos:** contienen las consultas y el acceso a las tablas de PostgreSQL.
- **Controladores:** reciben las solicitudes, ejecutan la lógica necesaria y devuelven la respuesta.
- **Rutas:** definen los endpoints y conectan cada solicitud con su controlador.
- **Vista:** corresponde al frontend que consume la API; no forma parte de este repositorio backend.

## Estructura del proyecto

```text
Inventario_back/
├── app.js                 # Punto de entrada de la API
├── config/
│   ├── db.js              # Configuración del pool de PostgreSQL
│   ├── DDL                # Creación de tablas y relaciones
│   └── DML                # Datos iniciales de ejemplo
├── controllers/           # Lógica de cada recurso
├── models/                # Consultas y acceso a datos
├── postman/               # Configuración para pruebas de la API
├── routes/                # Definición de endpoints
├── package.json
└── .env                   # Variables locales (no versionar)
```

La estructura puede variar de acuerdo con la versión del proyecto y los archivos incorporados durante el desarrollo.

## Requisitos

- Node.js 18 o superior.
- PostgreSQL en ejecución.
- Una base de datos llamada `Inventario` (o el nombre que se indique en las variables de entorno).

## Instalación y puesta en marcha

1. Descomprima el proyecto y abra una terminal dentro de su carpeta.

2. Instale las dependencias:

   ```bash
   npm install
   ```

3. Cree la base de datos en PostgreSQL:

   ```sql
   CREATE DATABASE "Inventario";
   ```

4. Ejecute el contenido de `config/DDL` para crear las tablas. Opcionalmente, ejecute `config/DML` para cargar datos de ejemplo.

5. Cree un archivo `.env` con esta configuración:

   ```env
   DB_USER=postgres
   DB_PASSWORD=tu_contrasena
   DB_HOST=localhost
   DB_NAME=Inventario
   DB_PORT=5432
   PORT=3000
   ```

6. Inicie el servidor:

   ```bash
   node app.js
   ```

   Para desarrollo con recarga automática:

   ```bash
   npx nodemon app.js
   ```

La API quedará disponible en `http://localhost:3000`.

## Pruebas de la API

La API puede probarse utilizando herramientas como Postman. Esto permite realizar solicitudes directamente al backend sin necesidad de utilizar el frontend.

Para comprobar que el servidor está funcionando, realice una petición `GET` a la raíz:

```text
GET http://localhost:3000/
```

La respuesta esperada es:

```json
{
  "message": "API del Inventario de Laboratorio funcionando correctamente"
}
```

También se pueden realizar, por ejemplo, las siguientes peticiones:

```text
GET http://localhost:3000/api/materiales
GET http://localhost:3000/api/usuarios
GET http://localhost:3000/api/solicitudes
```

De esta manera, Postman puede utilizarse para comprobar que los endpoints funcionan correctamente antes de conectarlos con el frontend.

## Recursos de la API

Todos los recursos usan la ruta base `/api`.

La API trabaja con roles, ubicaciones, categorías, usuarios, materiales, solicitudes, detalles de solicitud, movimientos, reportes y notificaciones.

Cada recurso cuenta con sus correspondientes rutas, controladores y modelos dentro de la arquitectura MVC.

Los principales endpoints utilizados por el frontend son:

| Recurso | Ruta base | Operaciones |
| --- | --- | --- |
| Roles | `/api/roles` | `GET`, `GET /:id`, `POST`, `PUT /:id`, `DELETE /:id` |
| Ubicaciones | `/api/ubicaciones` | `GET`, `GET /:id`, `POST`, `PUT /:id`, `DELETE /:id` |
| Categorías | `/api/categorias` | `GET`, `GET /:id`, `POST`, `PUT /:id`, `DELETE /:id` |
| Usuarios | `/api/usuarios` | `GET`, `GET /:id`, `POST`, `PUT /:id`, `DELETE /:id` |
| Materiales | `/api/materiales` | `GET`, `GET /:id`, `POST`, `PUT /:id`, `DELETE /:id` |
| Solicitudes | `/api/solicitudes` | `GET`, `GET /:id`, `POST`, `PUT /:id`, `DELETE /:id` |
| Detalles de solicitud | `/api/detalles-solicitud` | `GET`, `POST`, `PUT /:id`, `DELETE /:id` |
| Detalles por solicitud | `/api/detalles-solicitud/solicitud/:id_solicitud` | `GET` |
| Movimientos | `/api/movimientos` | `GET`, `GET /:id`, `POST`, `DELETE /:id` |
| Reportes | `/api/reportes` | `GET`, `GET /:id`, `POST`, `PUT /:id`, `DELETE /:id` |
| Notificaciones | `/api/notificaciones` | `GET`, `GET /:id`, `POST`, `PUT /:id`, `DELETE /:id` |

En los recursos que lo admiten, se puede consultar un registro individual agregando `/:id` a la ruta. Además, el endpoint `GET /api/detalles-solicitud/solicitud/:id_solicitud` obtiene los detalles asociados a una solicitud determinada.

Estos endpoints permiten que el frontend solicite y gestione información mediante solicitudes HTTP.

## Comunicación con el frontend

El backend se comunica con el frontend de la aplicación de inventario. El frontend puede realizar solicitudes HTTP utilizando el método `fetch()`.

Por ejemplo:

```javascript
fetch("http://localhost:3000/api/materiales")
```

El backend recibe la solicitud, procesa la petición y consulta la información correspondiente en la base de datos. Luego devuelve una respuesta en formato JSON, que el frontend puede utilizar para mostrar la información al usuario.

## Base de datos

El proyecto utiliza PostgreSQL como motor de base de datos. El esquema contiene diez tablas relacionadas:

- `rol`: roles de acceso.
- `usuario`: usuarios asociados a un rol.
- `ubicacion`: lugares físicos de almacenamiento.
- `categoria`: clasificación de materiales.
- `material`: existencias del inventario; se vincula con categoría y ubicación.
- `solicitud`: pedidos realizados por usuarios.
- `detalle_solicitud`: materiales y cantidades de cada solicitud.
- `movimiento`: entradas y salidas asociadas a materiales y usuarios.
- `reporte`: incidencias relacionadas con un material.
- `notificacion`: mensajes destinados a usuarios.

El archivo `config/DDL` contiene la estructura de las tablas y sus relaciones. El archivo `config/DML` contiene datos de prueba para iniciar el proyecto.

### Herramientas de administración

Se puede utilizar DBeaver, pgAdmin u otra herramienta compatible con PostgreSQL para:

- Visualizar tablas.
- Ejecutar consultas SQL.
- Insertar y modificar datos.
- Consultar registros.
- Administrar la estructura de la base.

## Variables de entorno

Las credenciales y los datos de conexión a la base de datos se almacenan en el archivo `.env`. Este archivo contiene información de configuración que no debe publicarse en el repositorio y debe incluirse en `.gitignore`.

El formato correcto es:

```env
DB_USER=postgres
DB_PASSWORD=tu_contrasena
DB_HOST=localhost
DB_NAME=Inventario
DB_PORT=5432
PORT=3000
```

### Notas importantes

- El archivo `.env` incluido utiliza nombres con guiones (`DB-USER`, por ejemplo), pero la aplicación lee nombres con guiones bajos (`DB_USER`). Use la plantilla indicada arriba para que la conexión funcione.
- No comparta ni suba al repositorio un archivo `.env` con contraseñas reales. Use un archivo `.env.example` sin secretos para documentar las variables necesarias.
- El proyecto no define todavía scripts `start` o `dev` en `package.json`; por eso se indican los comandos directos para iniciarlo.
- CORS está comentado en `app.js`. Si la API se consume desde un frontend alojado en otro origen, deberá instalar y habilitar el paquete `cors`.

## Datos de ejemplo

El archivo `config/DML` inserta roles, categorías, ubicaciones, usuarios, materiales, una solicitud, un movimiento, un reporte y una notificación de prueba. Revíselo antes de ejecutarlo en una base de datos con información existente.

## Flujo completo de la aplicación

El proyecto forma parte de una aplicación compuesta por diferentes capas:

```text
┌──────────────────────────────┐
│           USUARIO            │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│          FRONTEND            │
│       HTML + CSS + JS        │
└──────────────┬───────────────┘
               │
            fetch()
               │
               ▼
┌──────────────────────────────┐
│           BACKEND            │
│       Node.js + Express      │
│                              │
│             MVC              │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│          PostgreSQL          │
│        Base de datos         │
└──────────────────────────────┘
```

## Próxima etapa: Supabase

Actualmente, PostgreSQL se utiliza como solución de base de datos durante la etapa de desarrollo y aprendizaje.

Como posible siguiente etapa, se puede utilizar Supabase para alojar la base de datos PostgreSQL de forma remota. Esto permitiría evolucionar el proyecto desde un entorno local hacia una solución accesible mediante Internet.

```text
ETAPA 1
PostgreSQL local
      │
      ▼
Desarrollo y pruebas locales

ETAPA 2
Supabase
      │
      ▼
PostgreSQL remoto
      │
      ▼
Backend
      │
      ▼
Frontend
```

La utilización de Supabase no implica cambiar el motor de base de datos: Supabase utiliza PostgreSQL.

## Propósito educativo

Este proyecto fue desarrollado como material didáctico para trabajar el desarrollo de un backend completo y comprender cómo se relacionan sus diferentes componentes.

A partir de este proyecto se pueden trabajar conceptos como:

- Servidores.
- Node.js.
- Express.
- MVC.
- Rutas y endpoints.
- Métodos HTTP y APIs REST.
- Controladores y modelos.
- Bases de datos, SQL y PostgreSQL.
- Variables de entorno.
- Git y GitHub.
- Postman.
- Comunicación frontend-backend.
- Gestión de inventario.

## Posibles mejoras

El proyecto puede continuar evolucionando mediante la incorporación de:

- Validación de datos.
- Manejo centralizado de errores.
- Autenticación de usuarios.
- Autorización mediante roles.
- Hash de contraseñas.
- Middleware y JWT.
- Documentación interactiva de la API.
- Pruebas automatizadas.
- Scripts `start` y `dev` en `package.json`.
- Habilitación y configuración de CORS para el frontend.
- Migración de PostgreSQL local a Supabase.
- Despliegue del backend en un servidor.
- Conexión con un frontend publicado en Internet.

## Contexto

Proyecto educativo de Inventario de Laboratorio.

Backend desarrollado como ejemplo práctico para trabajar Node.js, Express, arquitectura MVC, APIs REST, PostgreSQL y comunicación entre frontend y backend.

El proyecto forma parte de una aplicación de Inventario de Laboratorio, junto con su correspondiente frontend.

