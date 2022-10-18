const { response } = require('express');
const Facilitador = require('../models/Facilitador');
const { generarJWT } = require('../helpers/jwt');




const getFacilitadores = async(req,res = response ) => {

        const facilitadores = await Facilitador.find()
                                    .populate('user','name');

        res.status(201).json({
            ok: true,
            facilitadores
    })

    
};



const crearFacilitador = async(req,res = response ) => {

        const facilitador = new Facilitador( req.body )

        try {

            facilitador.user = req.uid;
            
            const facilitadorGuardado = await facilitador.save()

            res.status(201).json({
                ok: true,
                facilitador: facilitadorGuardado
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el admin'
            })

        }

        

};




const actualizarFacilitador = async(req,res = response ) => {

        const facilitadorId = req.params.id;
        const uid = req.uid;

        try {
            
            const facilitador = await Facilitador.findById( facilitadorId );

            if ( !facilitador ) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Facilitador no existe con ese id'
                })
            }

            if ( facilitador.user.toString() !== uid ) {
                return res.status(401).json({
                    ok: false,
                    msg: "No tiene permiso para editar este facilitador"
                })
            }

            const nuevoFacilitador = {
                ...req.body,
                user: uid
            }

            const facilitadorActualizado = await Facilitador.findByIdAndUpdate( facilitadorId, nuevoFacilitador, { new: true } );

            res.status(201).json({
                ok: true,
                facilitador: facilitadorActualizado
            });

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el admin'
            })

        }

        
    
};



const eliminarFacilitador = async(req,res = response ) => {

    const facilitadorId = req.params.id;
    const uid = req.uid;

    try {
        
        const facilitador = await Facilitador.findById( facilitadorId );

        if ( !facilitador ) {
            return res.status(404).json({
                ok: false,
                msg: 'Facilitador no existe con ese id'
            })
        }

        if ( facilitador.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene permiso para eliminar este facilitador"
            })
        }


        await Facilitador.findByIdAndDelete(facilitadorId)

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
    getFacilitadores,
    crearFacilitador,
    actualizarFacilitador,
    eliminarFacilitador
 }