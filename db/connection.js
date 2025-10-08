const mongoose = require('mongoose');
let conn = process.env.DB_STRING_CONNECTION;
//console.log(conn);

const connectToDatabase = async () => {
    try {
        // Conexión a la base de datos MongoDB
        await mongoose.connect(conn);
        console.log('Conectado a la base de datos MongoDB');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1); // Termina el proceso si no se puede conectar
    }
}

// Exporta la función de conexión
module.exports = { connectToDatabase };