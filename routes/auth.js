const { Router } = require('express');
const {check} = require('express-validator');
const { crearUsuario, login, renew } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();

//crea un nuevo usuario
//el segundo argumento es middlewares, puede ser un arreglo, y elultimo
//parámetro es el código
router.post('/',[
    check('email','El email es obligatorio y debe tener un formáto válido').isEmail(),
    check('password','El password es obligatorio y mínimo 6 caracteres').notEmpty().isLength({min:6}),
    validarCampos,
],login )

//login de  usuario - se valida token
router.post('/new',[
    check('name','El nombre es obligatorio y debe tener 5 caracteres mínimo').notEmpty().isLength({min:5}),
    check('email','El email es obligatorio y debe tener un formáto válido').isEmail(),
    check('password','El password es obligatorio y mínimo 6 caracteres').notEmpty().isLength({min:6}),
    validarCampos,
],crearUsuario)

router.post('/login',[
    check('email','El email es obligatorio y debe tener un formáto válido').isEmail(),
    check('password','El password es obligatorio y mínimo 6 caracteres').notEmpty().isLength({min:6}),
    validarCampos,
],login)




router.get('/renew',validarJwt, renew )




module.exports = router;