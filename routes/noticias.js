const { Router } = require('express');

const { isDate } = require('../helpers/isDate');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { getNoticias, crearNoticias, actualizarNoticia, eliminarNoticia } = require('../controllers/noticias');

const router = Router();

router.get( '/', getNoticias );


router.use( jwtValidator )

router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('message','El mensaje es obligatorio').not().isEmpty(),
        check('date','La fecha es obligatoria').custom( isDate ),
        fieldValidator
    ], 
    crearNoticias 
);

router.put( 
    '/:id',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('message','El mensaje es obligatorio').not().isEmpty(),
        check('date','La fecha es obligatoria').custom( isDate ),
        fieldValidator
    ],  
    actualizarNoticia );

router.delete( '/:id', eliminarNoticia );

module.exports = router;