
const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.loginUsuario = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({errores: errors.array()})
    }

    //extraer email y password
    const {email, password} = req.body;

    try {
        let usuario = await Usuario.findOne({email});
        
        if(!usuario)
            {return res.status(400).json({msg: "El usuario no Existe"})}
        const passValid = await bcryptjs.compare(password, usuario.password);
        
        if(!passValid)
            {return res.status(400).json({msg: "Contraseña incorrecta"})}

        // Si todo es correcto Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        // firmar el JWT
        jwt.sign(payload, process.env.KEYSECRET, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;

            // Mensaje de confirmación
            res.json({ token  });
        });
           
    } catch (error) {
        console.log(error)
    }

}

exports.autenticarUsuario = async (req, res) =>{

    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.status(200).json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "No esta autenticado"});
    }

    
}