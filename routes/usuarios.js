const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const { check } = require("express-validator");


router.post("/newUser", 
[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email', 'Ingrese un correo valido').isEmail(),
    check('password','La contraseña debe ser minimo de 6 caracteres').isLength({min:6})
],
usuarioController.crearUsuario);


module.exports = router;