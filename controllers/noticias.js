const { response } = require('express');
const Noticia = require('../models/Noticia');
const { generarJWT } = require('../helpers/jwt');




const getNoticias = async(req,res = response ) => {

        const noticias = await Noticia.find()
                                    .populate('user','name');

        res.status(201).json({
            ok: true,
            noticias
    })

    
};



const crearNoticias = async(req,res = response ) => {

        const noticia = new Noticia( req.body )

        try {

            noticia.user = req.uid;
            
            const noticiaGuardada = await noticia.save()

            res.status(201).json({
                ok: true,
                noticia: noticiaGuardada
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el admin'
            })

        }

        

};




const actualizarNoticia = async(req,res = response ) => {

        const noticiaId = req.params.id;
        const uid = req.uid;

        try {
            
            const noticia = await Noticia.findById( noticiaId );

            if ( !noticia ) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Noticia no existe con ese id'
                })
            }

            if ( noticia.user.toString() !== uid ) {
                return res.status(401).json({
                    ok: false,
                    msg: "No tiene permiso para editar esta noticia"
                })
            }

            const nuevaNoticia = {
                ...req.body,
                user: uid
            }

            const noticiaActualizada = await Noticia.findByIdAndUpdate( noticiaId, nuevaNoticia, { new: true } );

            res.status(201).json({
                ok: true,
                noticia: noticiaActualizada
            });

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el admin'
            })

        }

        
    
};



const eliminarNoticia = async(req,res = response ) => {

    const noticiaId = req.params.id;
    const uid = req.uid;

    try {
        
        const noticia = await Noticia.findById( noticiaId );

        if ( !noticia ) {
            return res.status(404).json({
                ok: false,
                msg: 'Noticia no existe con ese id'
            })
        }

        if ( noticia.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene permiso para eliminar esta noticia"
            })
        }


        await Noticia.findByIdAndDelete(noticiaId)

        res.status(201).json({ ok: true });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })

    }
    
};



module.exports = { 
    getNoticias,
    crearNoticias,
    actualizarNoticia,
    eliminarNoticia
 }