/*
class Mascota {
  constructor(id, nombre, categoria, foto, descripcion, anunciante, ubicacion){
    //se genera un arreglo con los datos que del constructor se asignan
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.foto = foto;
    this.descripcion = descripcion;
    this.anunciante = anunciante;
    this.ubicacion = ubicacion;
  }
}

//se exporta el modelo
module.exports = Mascota;
*/

const mongoose = require('mongoose');

const MascotaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  categoria: {type: String, enum: ['Perro', 'Gato', 'Otro']},
  foto: String,
  descripcion: { type: String, required: true },
  anunciante: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
  ubicacion: String
}, {collection: 'Mascotas', timestamps: true});

MascotaSchema.methods.publicData = function() {
  return{
    id: this.id,
    nombre: this.nombre,
    categoria: this.categoria,
    foto: this.foto,
    descripcion: this.descripcion,
    anunciante: this.anunciante,
    ubicacion: this.ubicacion
  }
}

mongoose.model("Mascota", MascotaSchema);