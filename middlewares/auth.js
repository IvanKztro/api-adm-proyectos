const jwt = require('jsonwebtoken');

module.exports =  (req, res, next) =>{
    const token = req.header('x-auth-token');

    if(!token)
        return res.status(401).json({msg: 'Token no existe'});

        try {
            const cifrado = jwt.verify(token, process.env.KEYSECRET);
            req.usuario = cifrado.usuario;
            next();
        } catch (error) {
            res.status(400).json({msg: 'Token no valido'});
        }
}