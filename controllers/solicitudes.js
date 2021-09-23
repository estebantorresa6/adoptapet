const mongoose = require('mongoose');
const Solicitd = mongoose.model('Solicitud');

//CRUD 

function nuevaSolicitud(req, res, next){
  var solicitud = new Solicitd(req.body);
  solicitud.save().then(sol => {
    res.status(200).send(sol)
  }).catch(next)
}

function consultarSolicitudes(req, res, next){
  if(req.params.id){
    Solicitd.findById(req.params.id)
    .then(sol => {
      res.send(sol)
    })
    .catch(next)
  } else {
    Solicitd.find()
    .then(solicitudes => {
      res.send(solicitudes)
    })
    .catch(next)
  }
}

function modificarSolicitud(req, res, next){
  Solicitd.findById(req.params.id)
  .then(solicitud => {
    if (!solicitud){ return res.status(401); }
    let nuevaInfo = req.body
    if (typeof nuevaInfo.idMascota !== "undefined")
      solicitud.idMascota = nuevaInfo.idMascota
    if (typeof nuevaInfo.idUsuarioAnunciante !== "undefined")
      solicitud.idUsuarioAnunciante = nuevaInfo.idUsuarioAnunciante
    if (typeof nuevaInfo.idUsuarioSolicitante !== 'undefined')
        solicitud.idUsuarioSolicitante = nuevaInfo.idUsuarioSolicitante
    if (typeof nuevaInfo.estado !== 'undefined')
      solicitud.estado = nuevaInfo.estado
    solicitud.save()
    .then(updated => { res.status(200).json(updated.publicData() )})
    .catch(next)
  })
  .catch(next)
}

function eliminarSolicitud(req, res, next){
  Solicitd.findOneAndDelete({_id: req.params.id})
  .then(r => { res.status(200).send("La solicitud se elimino correctamente")})
  .catch(next)
}

function contarSolicitudes(req, res, next){
  var idMascota = req.params.masc;
  Solicitd.aggregate([
    {'$match' : { 'idMascota' : idMascota }},
    {'$count' : 'total'}
  ])
  .then(r => {
    res.status(200).send(r)
  })
  .catch()
}

module.exports = {
  nuevaSolicitud,
  consultarSolicitudes,
  modificarSolicitud,
  eliminarSolicitud,
}