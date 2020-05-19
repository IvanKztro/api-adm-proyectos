const Proyecto = require('../models/Proyecto');


exports.crearProyecto = async (req, res) =>{
    try {
        const proyecto =  new Proyecto(req.body);

        //Se guarda el creador del proyecto por JWT
        proyecto.creador = req.usuario.id;
        proyecto.save();
        res.status(200).json({msg: "Proyecto creado", proyecto});
        
    } catch (error) {
        res.status(500).json({msg: "Error con la base de datos"});
    }
}

exports.getProyectos = async (req, res) =>{
    try {

        const proyectos = await Proyecto.find({creador: req.usuario.id});
        res.json({ proyectos });
        
    } catch (error) {
        res.status(400).json({msg: "No se pudo obtener los proyectos"});
    }
}


exports.deleteProyecto = async(req, res) =>{

    try {
        let proyecto = await Proyecto.findById({_id: req.params.id});

        //Vetificar que el proyecto exista
        if(!proyecto) return res.status(404).json({msg: "El proyecto no existe"});

        //Verificar que el proyecto a borrar le pertenezca a dicho usuario
        //console.log(proyecto);
        if(proyecto.creador !== req.usuario.id) 
            return res.status(401).json({msg: "No tene permisos para elimnar este proyecto"});

        //Eliminamos proyecto 
        await Proyecto.findOneAndRemove({_id: req.params.id});
        res.status(200).json({status: true, msg:"Proyecto eliminado"});

        
    } catch (error) {
        console.log(error);
        res.status(401).json({msg: "Error al elimnar proyecto"});
    }

}