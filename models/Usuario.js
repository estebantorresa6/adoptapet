// Usuario.js
/** Clase que representa a un usuario de la plataforma*/
/*
class Usuario {
  constructor(id, username, nombre, apellido, email, password, tipo) {
    this.id = id;
    this.username = username;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.password = password;
    this.tipo = tipo; // tipo normal o anunciante
  }
}

module.exports = Usuario;
*/

//SE REDEFINE EL MODELO PARA QUE AHORA SEA UN ESQUEMA DE MONGOOSE
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret; //proxima clase

const UsuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "El campo username esta vacio"], //Le regresa ese mensaje de error al front
    lowercase: true,
    match: [/^[a-z0-0]+$/, "Username invalido"], //tiene que ser una expresion regular
    inde: true //los campos indexados se resuelven más rapido; los id están indexados por default 
  },
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, "No se ha proporcionado un email"],
    unique: true,
    match: [/\S+@\S+.\S+/, "Email invalido"],
    index: true
  },
  // password: String, LA CONTRASEÑA YA NO SE ENVIARÁ AQUÍ POR MOTIVOS DE SEGURIDAD
  tipo: {
    type: String,
    enum: ['normal', 'anunciante']
  },
  hash: String, //Aqui se enviará la contraseña cifrada
  salt: String
}, {collection: 'Usuarios', timestamps: true});

UsuarioSchema.plugin(uniqueValidator, {message: "Ya existe este usuario"})

UsuarioSchema.methods.publicData = function() {
  return{
    id: this.id,
    username: this.username,
    nombre: this.nombre,
    apellido: this.apellido,
    email: this.email,
    tipo: this.tipo
  }
}

UsuarioSchema.methods.crearPassword = function(password) {
  //esta es la semilla con la que el algoritmo generara el hash
  this.salt = crypto.randomBytes(16).toString('hex'); 
  //parametros del crypto(contraseña del usuario, semilla, iteraciones, longitud del texto, tipo de cifrado)
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

UsuarioSchema.methods.validarPassword = function(password){
  const newHash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hast === newHash
}

//creamos el JWT
UsuarioSchema.methods.generaJWT = function(){
  //definimos los días de creacion y expiracion 
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  //aquí es donde se genera el token
  return jwt.sign({
    id: this._id,
    username: this.username,
    //este es el tiempo de vida del JWT y se lo asigna a ese usuario con ese _id
    exp: parseInt(exp.getTime() / 1000)
  }, secret)
}

//cada que el usuario inicie sesión se envian estos datos
UsuarioSchema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    email: this.email,
    token: this.generaJWT()
  }
}

mongoose.model("Usuario", UsuarioSchema);