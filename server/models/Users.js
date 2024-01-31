const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    saves: { type: Array, default: [] },
    favorite: { type: Array, default: [] },
    watched: { type: Array, default: [] },
})

const UsersModel = mongoose.model('users', UsersSchema)
module.exports = UsersModel