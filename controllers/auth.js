const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req,res = response ) => {

    const { name, email, password, secretkey } = req.body;

    console.log(email)
    console.log(secretkey)

    try {
        let usuario = await Usuario.findOne({ email });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }

        if ( secretkey != process.env.SECRET_KEY ){
            return res.status(401).json({
                ok: false,
                msg: 'sKey Erronea'
            });
        }
        
        usuario = new Usuario( req.body )

        // Encriptar pass
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        //generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
    })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor contacte al administrador'
        });
    }
    
};



const loginUsuario = async(req,res = response) => {

    const { email, password } = req.body;


    try {
        let usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrecta'
            });
        }
        //confirmar pass
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrecta'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor contacte al administrador'
        });
    }

};



const revalidarToken = async(req,res = response) => {

    const { name, uid } = req

    // Generar JWT
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        uid, name,
        token
    })

}



module.exports = { 
    crearUsuario,
    loginUsuario,
    revalidarToken
 }