const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    dateRegister:{
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model("Usuario", UsuarioSchema);