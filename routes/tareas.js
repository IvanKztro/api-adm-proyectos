const express = require("express");
const router = express.Router();
const  auth = require("../middlewares/auth");
const { check } = require("express-validator");

const tareaController = require("../controllers/tareaController");
//  /api/tareas
router.post("/crearTarea",
    auth,
    [
        check("title", "El nombre de la tarea es obligatorio").not().isEmpty()
    ],
    tareaController.crearTarea
);

router.get("/",
    auth,
    tareaController.getTareas
)

router.put("/:id",
    auth,
    [
        check("title", "El nombre de la tarea es obligatorio").not().isEmpty(),
        check("done", "El porcentaje de vance es obligatorio")
    ],
    tareaController.updateTarea
)

router.delete("/:id",
    auth,
    tareaController.deleteTarea
)

module.exports = router;