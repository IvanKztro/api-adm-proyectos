
const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    //Revisar si no hay errores
    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({errores: errors.array()})
    }

    //extraer email y password
    const {email, password} = req.body;

    try {
        let usuario = await Usuario.findOne({email})

        if(usuario) return res.status(400).json({msg: "El correo ya existe"});

        usuario = new Usuario(req.body);
        
        //Generar salt y hashear paswword
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);
        
        await Usuario.create(usuario);

        //Crear  JWT
        const payload ={
            usuario:{
                id: usuario.id
            }
        };

        //Firmar JWT
        jwt.sign(payload, process.env.KEYSECRET,{
            expiresIn: 3600
        }, (error, token)=>{
            if(error) throw error
            
            res.json({token})
        });

        //res.json({state: true, msg: "Usuario creado"})

        
    } catch (error) {
        res.status(400).json({msg: "Error al crear usuario"});
    }

}

exports.login = async (req, res) => {

    try {
        const userValido = await usuarios.findOne({email});
        if(userValido)
        {
            const passwordExist = bcryptjs.compare(password, userValido.password);
        }
    } catch (error) {
        
    }

}