const { response } = require('express');
const Usuario = require('../models/Usuario');
const { generarJwt } = require('../helpers/jwt');
const bcrypt = require('bcryptjs');




const crearUsuario = async (req, res = response)=>{
    const {email, name, password} = req.body;
    try {
        
        //ver si no existe un email igual
        const usuario = await Usuario.findOne({email})
        
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: `Ya existe un usuario con el email ${email}`
            });
        }
        //crear usuario con el modelo
        const dbUser = new Usuario(req.body);

        //hashear password
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );
    
        //generar jwt

        const token = await generarJwt( dbUser.id, name);

        //crear usuario en bd

        await dbUser.save();
        //generar respuesta
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            password: dbUser.password,
            name,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comunicarse con el administrador'
        })
    }
}

const login = async(req, res = response)=>{
    const {email, password} = req.body;
    try {
        const dbUser = await Usuario.findOne({email});
        //buscar el usuario en la bs
        if(!dbUser){
            return res.status(400).json({
                ok: false,
                msg: "Usuario o clave incorrecto"
            })
        }

        //verificar password
        const validPassword = bcrypt.compareSync(password, dbUser.password)
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: "Usuario o clave incorrecto"
            })
        }

        //generar token
        const token = await generarJwt( dbUser.id, dbUser.name, dbUser.email);

        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con al administrador!!!'
        })
    }   
}

const renew = async (req, res = response)=>{

    const { uid } = req;

    const dbUser = await Usuario.findById(uid);

    const token = await generarJwt( uid, dbUser.name);

    return res.json({
        ok: true,
        uid,
        name: dbUser.name,
        email: dbUser.email,
        token
    })
}

module.exports = {
    crearUsuario,
    login,
    renew
}