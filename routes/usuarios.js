const router = require('express').Router();

const {
  crearUsuario,
  obtenerUsuarios,
  modificarUsuarios,
  eliminarUsuario,
  iniciarSesion
} = require('../controllers/usuarios');

const auth = require('./auth')

router.get('/', auth.requerido , obtenerUsuarios);
router.get('/:id', auth.requerido , obtenerUsuarios);
router.post('/', crearUsuario);
router.post('/entrar', iniciarSesion);
router.put('/:id', auth.requerido ,modificarUsuarios);
router.delete('/:id', auth.requerido, eliminarUsuario);

module.exports = router;




