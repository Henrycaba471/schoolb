const TemaModel = require('../models/temaModel');

const saveTema = async (req, res) => {
    let tema = req.body;

    if (!tema.title || !tema.level || !tema.subject || !tema.description) {
        return res.status(400).json({ msg: "Falta información para cargar el tema" });
    }

    try {
        const existTema = await TemaModel.findOne({ title: tema.title, subject: tema.subject });

        if (existTema !== null) {
            return res.json({ msg: 'Este tema ya existe' });
        }

        tema.user = req.user.id;

        const temaToSave = new TemaModel(tema);
        temaToSave.save();

        return res.json({ temaToSave });

    } catch (error) {
        res.status(400).res.json({ error, msg: "No se ha podido guardar el tema" });
    }
}

const temaPerSubject = async (req, res) => {
    const subject = req.params.subject;
    //console.log(subject);

    if (!subject) {
        return res.status(400).json({ msg: "No ha seleccionado ninguna asignatura" });
    }
    try {
        const temas = await TemaModel.find({ subject });
        res.json({ temas });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener los temas por asignatura" });
    }
}

const actualizarTema = async (req, res) => {
    const { id } = req.params;
    const { level } = req.body;
    if (!id || !level) {
        return res.status(400).json({ msg: "Falta información para actualizar el tema" });
    }
    const tema = await TemaModel.findById(id);
    if (!tema) {
        return res.status(404).json({ msg: "Tema no encontrado" });
    }
    tema.level = level;
    await tema.save();
    res.status(200).json({ msg: `Tema con ID ${id} actualizado a nivel ${level}` });
}

module.exports = {
    saveTema,
    temaPerSubject,
    actualizarTema
}