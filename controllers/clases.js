const { response } = require('express');
const Clase = require('../models/Clase');
const { generarJWT } = require('../helpers/jwt');




const getClases = async(req,res = response ) => {

        const clases =  await Clase.find()
                                    .populate('user','name');

        res.status(201).json({
            ok: true,
            clases
    })

    
};



const crearClase = async(req,res = response ) => {

        const clase = new Clase( req.body )

        try {

            clase.user = req.uid;
            
            const claseGuardada = await clase.save()

            res.status(201).json({
                ok: true,
                clase: claseGuardada
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el admin'
            })

        }

        

};




const actualizarClase = async(req,res = response ) => {

        const claseId = req.params.id;
        const uid = req.uid;

        try {
            
            const clase = await Clase.findById( claseId );

            if ( !clase ) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Clase no existe con ese id'
                })
            }

            if ( clase.user.toString() !== uid ) {
                return res.status(401).json({
                    ok: false,
                    msg: "No tiene permiso para editar esta clase"
                })
            }

            const nuevaClase = {
                ...req.body,
                user: uid
            }

            const claseActualizada = await Clase.findByIdAndUpdate( claseId, nuevaClase, { new: true } );

            res.status(201).json({
                ok: true,
                alumno: claseActualizada
            });

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el admin'
            })

        }

        
    
};



const eliminarClase = async(req,res = response ) => {

    const claseId = req.params.id;
    const uid = req.uid;

    try {
        
        const clase = await Clase.findById( claseId );

        if ( !clase ) {
            return res.status(404).json({
                ok: false,
                msg: 'Clase no existe con ese id'
            })
        }

        if ( clase.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene permiso para eliminar esta clase"
            })
        }


        await Clase.findByIdAndDelete(claseId)

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
    getClases,
    crearClase,
    actualizarClase,
    eliminarClase
 }