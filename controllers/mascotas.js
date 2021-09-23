const mongoose = require('mongoose');
const Mascota = mongoose.model('Mascota');

//CRUD 

//CREATE -- guardar un registro en la base de datos
function crearMascota (req, res, next){
  var mascota = new Mascota(req.body);
  mascota.save().then(mas => {
    res.status(200).send(mas)
  }).catch(next)
}

//READ -- consultar datos de la base de datos
function obtenerMascotas(req, res, next){
  if(req.params.id){
    Mascota.findById(req.params.id)
    .then(mas => {
      res.send(mas)
    })
    .catch(next)
  } else {
    Mascota.find()
    .then(mascotas => {
      res.send(mascotas)
    })
    .catch(next)
  }
}


//UPDATE --- modificar un registro 
function modificarMascota(req, res, next){
  Mascota.findById(req.params.id)
  .then(mascota => {
    if (!mascota){ return res.status(401); }
    let nuevaInfo = req.body
    if (typeof nuevaInfo.nombre !== "undefined")
      mascota.nombre = nuevaInfo.nombre
    if (typeof nuevaInfo.categoria !== "undefined")
      mascota.categoria = nuevaInfo.categoria
    if (typeof nuevaInfo.fotos !== 'undefined')
        mascota.fotos = nuevaInfo.fotos
    if (typeof nuevaInfo.descripcion !== 'undefined')
      mascota.descripcion = nuevaInfo.descripcion
    if (typeof nuevaInfo.anunciante !== 'undefined')
      mascota.anunciante = nuevaInfo.anunciante
    if (typeof nuevaInfo.ubicacion !== 'undefined')
      mascota.ubicacion = nuevaInfo.ubicacion
    mascota.save()
    .then(updated => { res.status(200).json(updated.publicData() )})
    .catch(next)
  })
  .catch(next)
}

function eliminarMascota(req, res, next){
  Mascota.findOneAndDelete({_id: req.params.id})
  .then(r => { res.status(200).send("La mascota se elimino correctamente")})
  .catch(next)
}

function count(req, res, next){
  var categoria = req.params.cat;
  Mascota.aggregate([
    {'$match' : {'categoria': categoria}},
    {'$count': 'total'}
  ])
  .then(r => {
    res.status(200).send(r)
  })
  .catch(next)
}

module.exports = {
  crearMascota,
  obtenerMascotas,
  modificarMascota,
  eliminarMascota,
  count
}