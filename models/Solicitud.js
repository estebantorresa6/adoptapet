// Solicitud.js
/** Clase que representa una solicitud de adopción */
/*
class Solicitud {
  constructor(id, idMascota, fechaDeCreacion, idUsuarioAnunciante, idUsuarioSolicitante, estado) {
    this.id = id;
    this.idMascota = idMascota;
    this.fechaDeCreacion = fechaDeCreacion;
    this.idUsuarioAnunciante = idUsuarioAnunciante;
    this.idUsuarioSolicitante = idUsuarioSolicitante;
    this.estado = estado;
  }

}

module.exports = Solicitud;
*/

const mongoose = require('mongoose');

const SolicitudSchema = new mongoose.Schema({
  idMascota: {type: mongoose.Schema.Types.ObjectId, ref: 'Mascota', required: true},
  fechaDeCreacion: String,
  idUsuarioAnunciante: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true},
  idUsuarioSolicitante: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true},
  estado: {type: String, enum: ['Disponible', 'Adoptado', 'En Proceso']},
}, {collection: 'Solicitudes', timestamps: true})

SolicitudSchema.methods.publicData = () => {
  return{
    id: this.id,
    idMascota: this.idMascota,
    fechaDeCreacion: this.fechaDeCreacion,
    idUsuarioAnunciante: this.idUsuarioAnunciante,
    idUsuarioSolicitante: this.idUsuarioSolicitante,
    estado: this.estado
  }
}

mongoose.model("Solicitud", SolicitudSchema);