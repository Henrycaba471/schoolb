//mongodb://localhost:27017/school
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    profile: {
        type: String,
        default: "usuario.png"
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = model("User", UserSchema, "users");