/*
    Rutas de usuarios / Alumnos
    host + /api/alumnos
*/

const { Router } = require('express');

const { isDate } = require('../helpers/isDate');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { getAlumnos, crearAlumno, actualizarAlumno, eliminarAlumno } = require('../controllers/alumnos');

const router = Router();


router.get( '/', getAlumnos );

router.use( jwtValidator )

router.post(
    '/',
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('claseadd','La clase es obligatoria').not().isEmpty(),
        fieldValidator
    ], 
    crearAlumno 
);

router.put( 
    '/:id',
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').not().isEmpty(),
        check('claseadd','La clase es obligatoria').not().isEmpty(),
        fieldValidator
    ],  
    actualizarAlumno );

router.delete( '/:id', eliminarAlumno );

module.exports = router;