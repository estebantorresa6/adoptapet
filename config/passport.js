const passport = require('passport');
//esta es la estrategía de autenticación
const LocalStrategy = require('passport').Strategy;
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, next) {
  Usuario.findOne({ email: email})
  .then(function (user){
    if (!user || !user.validarPassword(password)){
      return next(null, false, { error: 'email o contraseña incorrecta'});
    }
    return next(null, user)
  })
  .catch(next)
}))