const mongoose = require("mongoose");

const SchemaTarea = mongoose.Schema({
    title:
    {
        type: String,
        required: true
    },
    done:{
        type: Number,
        required: true,
        default: 0
    },
    creada:{
        type: Date,
        default: Date.now()
    },
    // creador:{
    //     type: String,
    //     required: true,
    //     idUsuario: mongoose.Schema.Types.ObjectId,
    //     ref: "Usuario"
    // },
    byProyecto:{
        type: String,
        required: true,
        idProyecto: mongoose.Schema.Types.ObjectId,
        ref: "Proyecto"
    }

})

module.exports = mongoose.model("Tarea", SchemaTarea);