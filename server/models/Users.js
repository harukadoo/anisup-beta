const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,  
    },
    email: {
        type: String, 
        unique: true, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    saves: { type: Array, default: [] },
    favorite: { type: Array, default: [] },
    watched: { type: Array, default: [] },
})

const UsersModel = mongoose.model('users', UsersSchema)
module.exports = UsersModel