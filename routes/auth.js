const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require('../middlewares/auth');

//Para iniciar sesión
router.post("/login", 
[
    check('email', 'Ingrese un correo valido').isEmail(),
    check('password','La contraseña debe ser minimo de 6 caracteres').isLength({min:6})
],authController.loginUsuario);

router.get("/",
    auth,
    authController.autenticarUsuario
)


module.exports = router;