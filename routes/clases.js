const { Router } = require('express');

const { isDate } = require('../helpers/isDate');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { getClases, crearClase, actualizarClase, eliminarClase } = require('../controllers/clases');

const router = Router();


router.get( '/', getClases );

router.use( jwtValidator )

router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('message','El mensaje es obligatorio').not().isEmpty(),
        check('date','La fecha es obligatoria').custom( isDate ),
        fieldValidator
    ], 
    crearClase 
);

router.put( 
    '/:id',
    [
        check('title','El nombre es obligatorio').not().isEmpty(),
        check('message','El nombre es obligatorio').not().isEmpty(),
        check('date','El nombre es obligatorio').custom( isDate ),
        fieldValidator
    ],  
    actualizarClase );

router.delete( '/:id', eliminarClase );

module.exports = router;