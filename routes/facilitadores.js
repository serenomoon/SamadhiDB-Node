const { Router } = require('express');

const { isDate } = require('../helpers/isDate');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { getFacilitadores, crearFacilitador, actualizarFacilitador, eliminarFacilitador } = require('../controllers/facilitadores');

const router = Router();

router.get( '/', getFacilitadores );


router.use( jwtValidator )

router.post(
    '/',
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('bio','La bio es obligatoria').not().isEmpty(),
        check('service','El servicio es obligatorio').not().isEmpty(),
        check('claseadd','La clase es obligatorio').not().isEmpty(),
        check('activity','La actividad es obligatorio').not().isEmpty(),
        check('date','La fecha es obligatoria').custom( isDate ),
        fieldValidator
    ], 
    crearFacilitador 
);

router.put( 
    '/:id',
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('bio','La bio es obligatoria').not().isEmpty(),
        check('service','El servicio es obligatorio').not().isEmpty(),
        check('claseadd','La clase es obligatorio').not().isEmpty(),
        check('activity','La actividad es obligatorio').not().isEmpty(),
        check('date','La fecha es obligatoria').custom( isDate ),
        fieldValidator
    ],  
    actualizarFacilitador );

router.delete( '/:id', eliminarFacilitador );

module.exports = router;