const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    creador: {
        type: String,
        idUsuario: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    fecha: {
      type: Date,
      default: Date.now()
    }
})

module.exports = mongoose.model("Proyecto", ProyectoSchema)