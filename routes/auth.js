/*
    Rutas usuario /Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');


const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')

router.post(
    '/new',
    [
        check('name','Colocar nombre').not().isEmpty(),
        check('email','Colocar email').isEmail(),
        check('password','El password debe ser de minimo 6 caracteres').isLength({min: 6}),
        check('secretkey','La key es obligatoria').not().isEmpty(),
        fieldValidator
    ],
    crearUsuario
);

router.post(
    '/',
    [
        check('email','Colocar email').isEmail(),
        check('password','El password debe ser de minimo 6 caracteres').isLength({min: 6})
    ],
    loginUsuario
);

router.get( '/renew', jwtValidator, revalidarToken );

module.exports = router;