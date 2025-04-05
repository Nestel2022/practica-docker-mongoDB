/**
 * @file server.js
 * @description API que me gestiona usuarios de prueba.
 * Conecta a una base de datos de MongoDB llamada practica-database y permite realizar operaciones de lectura, creación, actualización y eliminación.
 */

const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();

const url = 'mongodb://localhost:27017/';
const dbName = 'practica-database';
const collectionName = 'users';
const port = 8080;

let db;

/**
 * Conexión inicial a MongoDB.
 * Se establece la conexión a la base de datos y se almacena en `db`.
 */
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Conectado a MongoDB');
        db = client.db(dbName);
    })
    .catch(err => {
        console.log('Error al conectar a MongoDB:', err);
    });

app.use(bodyParser.json());

/**
 * Ruta GET para obtener todos los documentos de la colección de usuarios.
 * @route GET /users
 * @returns {Array} Array de usuarios.
 * @throws {500} Si ocurre un error al obtener los usuarios.
 */
app.get('/users', async (req, res) => {
    try {
        const collection = db.collection(collectionName);
        const users = await collection.find({}).toArray();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
});

/**
 * Ruta GET para obtener documentos de usuarios según un criterio de búsqueda.
 * @route GET /users/search
 * @param {string} first_name - El primer nombre del usuario a buscar.
 * @param {string} last_name - El apellido del usuario a buscar.
 * @param {string} email - El correo electrónico del usuario a buscar.
 */
app.get('/users/search', async (req, res) => {
    const { first_name, last_name, email } = req.query;

    try {
        const collection = db.collection(collectionName);
        const query = {};
        if (first_name) query.first_name = first_name;
        if (last_name) query.last_name = last_name;
        if (email) query.email = email;

        const users = await collection.find(query).toArray();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error al buscar usuarios' });
    }
});

/**
 * Ruta PUT para modificar un documento o crear uno nuevo si no se encuentra.
 * @route PUT /users/:id
 * @param {string} id - El ID del usuario a actualizar o crear.
 * @param {Object} body - Los datos del usuario a actualizar o crear.
 * @param {string} body.first_name - El primer nombre del usuario.
 * @param {string} body.last_name - El apellido del usuario.
 * @param {string} body.email - El correo electrónico del usuario.
 * @param {string} body.gender - El género del usuario.
 * @param {Object} body.address - La dirección del usuario.
 * @param {Object} body.card - Los datos de la tarjeta del usuario.
 * @param {boolean} body.married_status - El estado civil del usuario.
 */
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, gender, address, card, married_status } = req.body;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'El ID proporcionado no es válido' });
    }

    try {
        const collection = db.collection(collectionName);
        const user = await collection.findOne({ _id: new ObjectId(id) });

        if (user) {
            await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { first_name, last_name, email, gender, address, card, married_status } }
            );
            res.status(200).json({
                message: 'Usuario actualizado correctamente'
            });
        } else {
            const newUser = {
                _id: new ObjectId(id),
                first_name,
                last_name,
                email,
                gender,
                address,
                card,
                married_status
            };

            await collection.insertOne(newUser);

            res.status(201).json({
                message: 'Usuario creado correctamente',
                newUser: newUser._id
            });
        }
    } catch (err) {
        console.error('Error al actualizar o crear el usuario:', err);
        res.status(500).json({ message: 'Error al actualizar o crear el usuario' });
    }
});

/**
 * Ruta DELETE para eliminar un documento según un ID.
 * @route DELETE /users/:id
 * @param {string} id - El ID del usuario a eliminar.
 * @returns {Object} El mensaje de eliminación del usuario.
 * @throws {400} Si el ID proporcionado no es válido.
 * @throws {500} Si ocurre un error al eliminar el usuario.
 * @throws {204} Si no se encontró el usuario.
 * @throws {200} Si se eliminó correctamente el usuario.
 */
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'El ID proporcionado no es válido' });
    }

    try {
        const collection = db.collection(collectionName);
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(204).json({ message: 'No se encontró el usuario para eliminar' });
        }

        return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (err) {
        console.error('Error al eliminar el usuario:', err);
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Error al eliminar el usuario' });
        }
    }
});

/**
 * Inicia el servidor en el puerto especificado.
 * @function
 * @listens {8080}
 */
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
