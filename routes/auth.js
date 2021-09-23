//aqui se validarán los usuarios

const jwt = require('express-jwt');
const secret = require('../config').secret;

//si regresa un valor, es el token
function getTokenFromHeader(req){
  if(req.headers.authorization && (req.headers.authorization.split(' ')[0] === 'Token' || req.headers.authorization.split(' ')[0] === 'Bearer')){
    return req.headers.authorization.split(' ')[1];
  }
  return null;
}

const auth = {
  requerido: jwt({
    secret: secret,
    algorithms: ['HS256'],
    userProperty: 'usuario',
    getToken: getTokenFromHeader
  }),
  opcional: jwt({
    secret: secret,
    algorithms: ['HS256'],
    userProperty: 'usuario',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

module.exports = auth;