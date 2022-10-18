const { response } = require('express');
const Alumno = require('../models/Alumno');
const { generarJWT } = require('../helpers/jwt');




const getAlumnos = async(req,res = response ) => {

        const alumnos = await Alumno.find()
                                    .populate('user','name');

        res.status(201).json({
            ok: true,
            alumnos
    })

    
};



const crearAlumno = async(req,res = response ) => {

        const alumno = new Alumno( req.body )

        try {

            alumno.user = req.uid;
            
            const alumnoGuardado = await alumno.save()

            res.status(201).json({
                ok: true,
                alumno: alumnoGuardado
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el admin'
            })

        }

        

};




const actualizarAlumno = async(req,res = response ) => {

        const alumnoId = req.params.id;
        const uid = req.uid;

        try {
            
            const alumno = await Alumno.findById( alumnoId );

            if ( !alumno ) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Evento no existe con ese id'
                })
            }

            if ( alumno.user.toString() !== uid ) {
                return res.status(401).json({
                    ok: false,
                    msg: "No tiene permiso para editar este evento"
                })
            }

            const nuevoAlumno = {
                ...req.body,
                user: uid
            }

            const alumnoActualizado = await Alumno.findByIdAndUpdate( alumnoId, nuevoAlumno, { new: true } );

            res.status(201).json({
                ok: true,
                alumno: alumnoActualizado
            });

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el admin'
            })

        }

        
    
};



const eliminarAlumno = async(req,res = response ) => {

    const alumnoId = req.params.id;
    const uid = req.uid;

    try {
        
        const alumno = await Alumno.findById( alumnoId );

        if ( !alumno ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese id'
            })
        }

        if ( alumno.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene permiso para eliminar este evento"
            })
        }


        await Alumno.findByIdAndDelete(alumnoId)

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
    getAlumnos,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
 }