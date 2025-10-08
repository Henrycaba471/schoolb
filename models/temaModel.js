const { Schema, model } = require('mongoose');

const TemaSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    level: {
        type: Number,
        default: 0
    },
    subject: {
        type: String,
        required: true
    }
});

module.exports = model('Tema', TemaSchema, 'temas');



const WordSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    english: {
        type: String,
        required: true
    },
    spanish: {
        type: String,
        require: true
    },
    subject: {
        type: String,
        required: true
    }
});