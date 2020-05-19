const express = require('express');
const router = express.Router();
const proyectoController = require("../controllers/proyectoController")
const auth = require('../middlewares/auth');
const { check } = require("express-validator");

///  api/proyectos
router.post('/crearProyecto', 
    auth,
    [
        check('name', 'El nombre del proyecto es obligatoio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

router.get("/getProyectos",
    auth,
    proyectoController.getProyectos
)

router.delete("/:id",
    auth,
    proyectoController.deleteProyecto
)


module.exports = router;