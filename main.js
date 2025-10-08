const cors = require('cors');
const express = require('express');
require('dotenv').config();
const { connectToDatabase } = require('./db/connection');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos
connectToDatabase();

const userRoutes = require('./routes/user.routes');
const temaRoutes = require('./routes/temas.routes');

app.use('/api/users', userRoutes);
app.use('/api/temas', temaRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});