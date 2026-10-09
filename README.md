# Inventario de Laboratorio — Backend

Proyecto Institucional,

El proyecto implementa el backend de una aplicación de inventario de laboratorio, utilizando JavaScript, Node.js y Express, y aplicando el patrón de arquitectura MVC (Modelo - Vista - Controlador).

El backend proporciona una API REST que permite al frontend consultar y gestionar información relacionada con materiales, usuarios y solicitudes.

Actualmente, el proyecto utiliza PostgreSQL como sistema gestor de base de datos y DBeaver como herramienta para administrar y consultar la base de datos.

Como etapa posterior del proyecto, se prevé la migración de la base de datos a Supabase.

## Objetivo del proyecto

El proyecto fue desarrollado principalmente con fines educativos, para que los estudiantes puedan comprender cómo se construye un backend y cómo se comunica con un frontend.

A través de este proyecto se trabajan conceptos como:

- Desarrollo de aplicaciones backend.
- Node.js.
- Express.
- Arquitectura MVC.
- APIs REST.
- Rutas y endpoints.
- Métodos HTTP.
- Controladores.
- Modelos.
- Conexión con bases de datos.
- PostgreSQL.
- Consultas SQL.
- Formato JSON.
- Comunicación entre frontend y backend.

## Tecnologías utilizadas

| Tecnología | Uso |
| --- | --- |
| JavaScript | Lenguaje utilizado para desarrollar el backend |
| Node.js | Entorno de ejecución de JavaScript |
| Express | Framework utilizado para construir el servidor y la API |
| MVC | Arquitectura utilizada para organizar el proyecto |
| PostgreSQL | Motor de base de datos |
| DBeaver | Herramienta para administrar y consultar PostgreSQL |
| Git / GitHub | Control de versiones |

## Próxima etapa

Supabase será utilizado posteriormente como plataforma para alojar y gestionar la base de datos PostgreSQL de forma remota.

## Arquitectura MVC

El proyecto utiliza la arquitectura MVC (Model - View - Controller).

Esta arquitectura permite organizar el código separando las responsabilidades de cada componente.

En este proyecto, el backend actúa como intermediario entre el frontend y la base de datos.

## Estructura del proyecto

La estructura del proyecto sigue el patrón MVC.

```text
Inventario_back/
│
├── controllers/
│
├── models/
│
├── routes/
│
├── config/
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── app.js
```

La estructura puede variar de acuerdo con la versión del proyecto y los archivos incorporados durante el desarrollo.

## Recursos de la API

La API trabaja principalmente con tres recursos:

- Materiales.
- Usuarios.
- Solicitudes.

Cada recurso cuenta con sus correspondientes rutas y lógica dentro de la arquitectura MVC.

Los principales endpoints utilizados por el frontend son:

| Recurso | Endpoint | Método |
| --- | --- | --- |
| Materiales | `/api/materiales` | `GET` |
| Usuarios | `/api/usuarios` | `GET` |
| Solicitudes | `/api/solicitudes` | `GET` |

Estos endpoints permiten que el frontend solicite información al backend mediante solicitudes HTTP.

## Comunicación con el frontend

El backend se comunica con el proyecto:

Frontend Inventario de Laboratorio

El frontend realiza solicitudes HTTP utilizando el método `fetch()`.

Por ejemplo:

```javascript
fetch("http://localhost:3000/api/solicitudes")
```

El backend recibe la solicitud, procesa la petición y consulta la información correspondiente en la base de datos.

Luego devuelve una respuesta en formato JSON, que puede ser utilizada por el frontend para mostrar la información al usuario.

## Base de datos

Actualmente, el proyecto utiliza PostgreSQL como motor de base de datos.

La base contiene información relacionada con los recursos principales del inventario:

- Materiales.
- Usuarios.
- Solicitudes.

### DBeaver

Es la herramienta utilizada para conectarse a PostgreSQL y realizar tareas como:

- Visualizar tablas.
- Ejecutar consultas SQL.
- Insertar datos.
- Modificar datos.
- Consultar registros.
- Administrar la estructura de la base.

## Variables de entorno

Las credenciales y los datos de conexión a la base de datos se almacenan mediante variables de entorno.

El proyecto utiliza un archivo:

```text
.env
```

Este archivo contiene información de configuración que no debe publicarse en el repositorio.

Por este motivo, `.env` debe incluirse en:

```text
.gitignore
```

De esta manera, las credenciales y datos sensibles de conexión no se incorporan al control de versiones.

## Instalación y ejecución

### 1. Clonar el proyecto

Clonar el repositorio en el equipo local.

```bash
git clone URL_DEL_REPOSITORIO
```

Ingresar a la carpeta:

```bash
cd Inventario_back
```

### 2. Instalar las dependencias

Ejecutar:

```bash
npm install
```

Esto instalará las dependencias definidas en `package.json`.

### 3. Configurar las variables de entorno

Crear un archivo:

```text
.env
```

y configurar allí los datos necesarios para la conexión con PostgreSQL.

No publicar el archivo `.env` en GitHub.

### 4. Iniciar el servidor

Ejecutar el comando correspondiente configurado en el proyecto.

Por ejemplo:

```bash
node app.js
```

Una vez iniciado, el servidor quedará disponible en el puerto configurado.

En el proyecto utilizado actualmente por el frontend:

```text
http://localhost:3000
```

## Pruebas de la API

La API puede probarse utilizando herramientas como Postman.

Esto permite realizar solicitudes directamente al backend sin necesidad de utilizar el frontend.

Por ejemplo:

```text
GET http://localhost:3000/api/materiales
```

o:

```text
GET http://localhost:3000/api/usuarios
```

o:

```text
GET http://localhost:3000/api/solicitudes
```

De esta manera, Postman puede utilizarse como una herramienta para comprobar que los endpoints funcionan correctamente antes de conectarlos con el frontend.

## Flujo completo de la aplicación

El proyecto forma parte de una aplicación compuesta por diferentes capas:

```text
┌──────────────────────────────┐
│          USUARIO             │
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

Como siguiente etapa del proyecto se prevé utilizar Supabase.

Supabase permite trabajar con una base de datos PostgreSQL alojada de manera remota, lo que permitirá evolucionar el proyecto desde un entorno local hacia una solución accesible mediante Internet.

La evolución prevista es:

```text
ETAPA 1
PostgreSQL local
      │
      │
      ▼
DBeaver
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

Este proyecto fue desarrollado como material didáctico para 7.º año de la Tecnicatura en Programación.

Su objetivo es permitir que los estudiantes puedan observar el funcionamiento de un backend completo y comprender cómo se relacionan sus diferentes componentes.

A partir de este proyecto se pueden trabajar conceptos como:

- Servidores.
- Node.js.
- Express.
- MVC.
- Rutas.
- Endpoints.
- Métodos HTTP.
- APIs REST.
- Controladores.
- Modelos.
- Bases de datos.
- SQL.
- PostgreSQL.
- Variables de entorno.
- Git y GitHub.
- Postman.
- Comunicación frontend-backend.

## Posibles mejoras

El proyecto puede continuar evolucionando mediante la incorporación de:

- Métodos POST, PUT y DELETE.
- Validación de datos.
- Manejo de errores.
- Autenticación de usuarios.
- Autorización mediante roles.
- Middleware.
- JWT.
- Documentación de la API.
- Pruebas automatizadas.
- Migración de PostgreSQL local a Supabase.
- Despliegue del backend en un servidor.
- Conexión con un frontend publicado en Internet.

## Contexto

Proyecto educativo — 7.º año de la Tecnicatura en Programación

Backend desarrollado como ejemplo práctico para trabajar Node.js, Express, arquitectura MVC, APIs REST, PostgreSQL y comunicación entre frontend y backend.

El proyecto forma parte de una aplicación de Inventario de Laboratorio, junto con su correspondiente frontend.
