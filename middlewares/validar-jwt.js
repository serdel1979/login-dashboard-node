const {response} = require("express")
const jwt = require('jsonwebtoken');


const validarJwt = (req, res = response, next)=>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'Error en la solicitud'
        })
    }

    try {

        const {uid, name, email} = jwt.verify(token,process.env.JWT_SEED);
        req.uid = uid;
        req.email = email
        req.name = name;

        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    next();
}

module.exports = {
    validarJwt
}
