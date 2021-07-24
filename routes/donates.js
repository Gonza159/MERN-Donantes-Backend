/*
    Event Routes
    /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getDonantes, crearDonante, actualizarDonante, eliminarDonante } = require('../controllers/donates');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );


// Obtener donantes 
router.get('/', getDonantes );

// Crear un nuevo donante
router.post(
    '/',
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        // check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearDonante 
);

// Actualizar donante
router.put(
    '/:id', 
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        // check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarDonante 
);

// Borrar donante
router.delete('/:id', eliminarDonante );

module.exports = router;