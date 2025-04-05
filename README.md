# API de practica Bootcamp Tecnologías para el desarrollo web

Esta es una API sencilla para gestionar usuarios usando **Node.js** y **MongoDB**. Esta API proporciona operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para gestionar usuarios. Los usuarios se almacenan en una base de datos MongoDB, que puede estar corriendo localmente o en un contenedor Docker.

## Requisitos

- **Node.js** (version 14 o superior)
- **MongoDB** (local o Dockerizado)
- **npm** (Node Package Manager)
- **Docker** (Para dockerizar la api y base de datos)

## Instalación

### 1. Clonar el repositorio

```bash
https://github.com/Nestel2022/practica-docker-mongoDB.git
```
### 2. Instalar dependencias
Ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
npm install
```

### Dockerizar
Puedes replicar en docker implementando el siguiente comando:
```bash
docker-compose up --build
```
### Rutas de la API
### 1. GET /users
Descripción: Devuelve todos los usuarios en la colección.
### Respuesta Exitosa: 200 OK

```json
[
    {
        "_id": "607d1f77bcf86cd799439011",
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "gender": "Male",
        "address": {
            "city": "New York",
            "state": "NY",
            "country": "USA",
            "country_code": "US"
        },
        "card": {
            "card_number": "1234567812345678",
            "card_type": "visa",
            "currency_code": "USD",
            "balance": "$500"
        },
        "married_status": true
    }
]
```
### Respuesta con Error: 500 Internal Server Error

### 2. GET /users/search?first_name=&last_name=&email=
Descripción: Permite buscar usuarios por uno o varios criterios de búsqueda (nombre, apellido, email).

### Parámetros de Consulta:

first_name: (opcional) El primer nombre del usuario.

last_name: (opcional) El apellido del usuario.

email: (opcional) El correo electrónico del usuario.

### Respuesta Exitosa: 200 OK

```json
[
    {
        "_id": "607d1f77bcf86cd799439011",
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "gender": "Male",
        "address": {
            "city": "New York",
            "state": "NY",
            "country": "USA",
            "country_code": "US"
        },
        "card": {
            "card_number": "1234567812345678",
            "card_type": "visa",
            "currency_code": "USD",
            "balance": "$500"
        },
        "married_status": true
    }
]
```
### Respuesta con Error: 404 Not Found si no se encuentra ningún usuario.

### 3. PUT /users/:id
Descripción: Modifica un usuario existente o crea uno nuevo si no se encuentra.

Parámetros en la URL:

id: El ID del usuario a modificar o crear debe tener una longitud de 24 caracteres hexadecimales, para que sea valida la operación.

Cuerpo de la Solicitud (JSON):

```json
{
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane.doe@example.com",
    "gender": "Female",
    "address": {
        "city": "Los Angeles",
        "state": "CA",
        "country": "USA",
        "country_code": "US"
    },
    "card": {
        "card_number": "8765432187654321",
        "card_type": "mastercard",
        "currency_code": "USD",
        "balance": "$1000"
    },
    "married_status": false
}
```
### Respuesta Exitosa:

200 OK: Si el usuario ya existe y fue actualizado.

201 Created: Si el usuario no existía y fue creado.

### 4. DELETE /users/:id
Descripción: Elimina un usuario por su ID, este id debe tener las mismas caracteristicas de la anterior API.

Parámetros en la URL:

id: El ID del usuario a eliminar.

### Respuesta Exitosa:

200 OK: Si el usuario fue eliminado correctamente.

204 No Content: Si no se encontró un usuario con el ID proporcionado.

### Respuesta con Error:

400 Bad Request: Si el ID proporcionado no es válido.

500 Internal Server Error: Si ocurrió un error al eliminar el usuario.

### Probar la API
Se puede usar la api usando Postman de acuerdo a la guia. 

### Ejemplo de cómo probar con Postman:
### GET /users
http://localhost:8080/users

### GET /users/search
http://localhost:8080/users/search?first_name=Claus2&last_name=Dudny&email=cdudnyu@unicef.org

### PUT /users/:id
http://localhost:8080/users/ffffbe36202f5f8c9184945f

Body
```json
{
  "first_name": "Pedro",
  "last_name": "Daniel",
  "email": "cdudnyu@unicef.org",
  "gender": "Male",
  "address": {
    "city": "Virginia Beach",
    "state": "Virginia",
    "country": "United States",
    "country_code": "US"
  },
  "card": {
    "card_number": "3579455434223708",
    "card_type": "jcb",
    "currency_code": "USD",
    "balance": "$8394.44"
  },
  "married_status": false
}
```

### DELETE /users/:id
http://localhost:8080/users/67f0be36205f5f8c91849443

### Respuestas de Error Comunes
400 Bad Request: El ID proporcionado no es válido o falta un parámetro requerido.

404 Not Found: No se encontró ningún usuario que coincida con los criterios de búsqueda.

500 Internal Server Error: Hubo un error en el servidor al procesar la solicitud.