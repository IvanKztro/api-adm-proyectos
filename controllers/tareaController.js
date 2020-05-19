const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator")


//api/tareas

//Crear tarea
exports.crearTarea = async(req, res) =>{

    const errores = validationResult(req);

    if(!errores.isEmpty())
        return res.status(400).json({errores: errores});
    try {
        const {byProyecto} = req.body;
        const proyecto = await Proyecto.findById({_id: byProyecto});

        //Revisa que el proyecto al cual se le quiere asignar la tarea, exista
        if(!proyecto)
            return res.status(404).json({msg: "El proyecto no existe"});

        //Revisa que el usuario autentificado sea dueño del proyecto
        if(proyecto.creador !== req.usuario.id)
            return res.status(401).json({msg: "No tienes permiso para crear tareas"});
        
        

        const nuevaTarea =  new Tarea(req.body);
        await nuevaTarea.save();


        res.status(200).json({status: true, tarea: nuevaTarea});

    } catch (error) {
       // console.log(error);
        res.status(400).send("Error");
    }
}

//OBTENER TAREAS DE UN PROYECTO
exports.getTareas = async (req, res) => {

    try {

        const { byProyecto } = req.query;
        // console.log(byProyecto);
        // console.log( req.query);
        const existeProyecto = await Proyecto.findById(byProyecto);
        if(!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // Obtener las tareas por proyecto
        const tareas = await Tarea.find({byProyecto: byProyecto});
        res.status(200).json(tareas);
        
    } catch (error) {
        console.log(error);
        res.status(400).json({status: false, msg: "error"})
    }
}

//ACTUALIZAR TAREA
exports.updateTarea = async (req, res) => {

    try {
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea)
            return res.status(404).json({status: false, msg: "Tarea no encontrada"})

        const {byProyecto, title, done} = req.body;
        const proyecto = await Proyecto.findById(byProyecto);

        //Verificar que el proyecto exista
        if(!proyecto)
            return res.status(404).json({status: false, msg: "Proyecto no existe"});
        
        //Verificar que el usuario autentificado sea el creador del proyecto
        if(req.usuario.id !== proyecto.creador)
            return res.status(401).json({status: false, msg: "No tienes permisos sobre este proyecto"});

        const nuevaTarea = {}

        nuevaTarea.title = title;
        nuevaTarea.done = done;

        tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new: true});
        

        res.status(200).json({status: true, tarea})
        
    } catch (error) {
        console.log(error)
        res.status(400).send("Error al actualizar");
    }
}

//Elimnando tarea
exports.deleteTarea = async (req, res) =>{

    try {

        const tarea = await Tarea.findById(req.params.id);
        const {byProyecto} = req.query

        //Verificar que la tarea exista
        if(!tarea)
            return res.status(404).json({status: false, msg: "Tarea no existe"});

        //Verificar que la tarea pertenezca al proyecto
        //console.log(`${tarea.byProyecto} !== ${byProyecto}`)
        if(tarea.byProyecto !== byProyecto )
            return res.status(401).json({status: false, msg: "Esta tarea no pertenece al proyecto indicado"});


        const proyecto = await Proyecto.findById(byProyecto);
        //Verificar que el proyecto exista
        if(!proyecto)
            return res.status(404).json({status: false, msg: "El proyecto no existe"});

        //Vefificar que el usaurio autenticado tenga permisos para editar tareas del proyecto
        if(proyecto.creador !== req.usuario.id)
            return res.status(401).json({status: false, msg: "No tiene permisos para editar esta tarea"});
        
        //Eliminando tarea
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.status(200).json({status: true, msg: "Tarea eliminada"});
        
    } catch (error) {
        console.log(error)
        res.status(400).send("Errror Servidor");
    }
}