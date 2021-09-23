const router = require('express').Router();

const {
  crearMascota,
  obtenerMascotas,
  modificarMascota,
  eliminarMascota,
  count
} = require('../controllers/mascotas');

//El orden en el que se establecen las rutas sí importa. La más particular hasta arriba
router.get('/', obtenerMascotas);
router.get('/count/:cat', count);
router.get('/:id', obtenerMascotas);
router.post('/', crearMascota);
router.put('/:id', modificarMascota);
router.delete('/:id', eliminarMascota);

module.exports = router;