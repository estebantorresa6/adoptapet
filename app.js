const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DEFINIR LA CONFIGURACION DE LA BASE DE DATOS 
const mongoose = require('mongoose');



//conectar a la base de datos. siempre debe definirse antes de las rutas 
mongoose.connect(
  process.env.MONGO_URI, //obtiene la url de las variables de entorno
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

//importar los esquemas desde la carpeta modelos 
require('./models/Usuario');
require('./models/Mascota');
require('./models/Solicitud');

//importamos passport. Con esto podemos saber quien utiliza nuestros servicios 
require('./config/passport')

//activamos el modo de debug para que nos lance los errores 
mongoose.set("debug", true);

//RUTAS
app.use('/v1', require('./routes'))

//DEFINIMOS UN PUERTO DONDE CORRERÁ LA APLICACIÓN
//const PORT = 4001;

// LE DECIMOS A LA APP QUE ESCUCHE EN ESTE PUERTO
app.listen(process.env.PORT, () => {
  console.log(`It is Aliveee!!! Server listening on PORT ${process.env.PORT}`);
})



/*
const gods = { 
  Zeus: { live: 'Olympus', symbol: 'Thunderbolt' }, 
  Hades : { live : 'Underworld', symbol: 'Cornucopia' } ,
  Aphrodite : { live : 'Olympus', symbol: 'Dolphin' } 
};

const constelaciones = {
  Andromeda : {
    abreviatura : 'And',
    superficie :  722.3,
    num_estrellas : 152,
    estr_mas_brillante : 'Alpheratz' 
  },
  Orion : {
    abreviatura : 'Ori',
    superficie :  594.1,
    num_estrellas : 204,
    estr_mas_brillante : 'Rigel' 
  },
  Pegaso : {
    abreviatura : 'Peg',
    superficie :  1120.8,
    num_estrellas : 177,
    estr_mas_brillante : 'Enif' 
  },
  Ofiuco : {
    abreviatura : 'Oph',
    superficie :  948.3,
    num_estrellas : 174,
    estr_mas_brillante : 'Ras Alhage' 
  },
  Casiopea : {
    abreviatura : 'Cas',
    superficie :  598.4,
    num_estrellas : 157,
    estr_mas_brillante : 'Gamma Cassiopeiae' 
  },
}

//EJEMPLO 1
//Definimos el comportamiento de la ruta /gods pasandole como parametros la peticion y la respuesta
app.get('/gods', (req, res)=>{
  res.send(gods);
})

//RETO 1 
app.get('/constellations', (req, res)=>{
  res.send(constelaciones);
})

//EJEMPLO 2
app.get('/gods/:name', (req, res)=>{
  var name = req.params.name;
  var god = gods[name];

  if(god){
    res.send(god)
  } else {
    res.status(404).send("Not found :(");
  }
})

//RETO 2 
app.get('/constellations/:busq', (req, res)=>{
  var busq = req.params.busq;

  for(i = 0; i <= busq.lenght; i++){

    var conste = constelaciones[busq[i]];

    if(conste){
      res.send(conste)
    } else {
      res.status(404).send("Not found :(");
    }
  }
  
  
})

//EJEMPLO 3 
app.put('/gods/:name', (req, res)=>{
  var god = req.params.name;
  gods[god] = req.body
  res.send(gods);
})

app.post('/gods', (req, res) => {
  const name = req.query.name
  const newGod = req.body;
  gods[name] = newGod;
  res.status(200).send(gods);
})

app.delete('/gods/:name', (req, res) =>{
  const name = req.params.name;
  if (delete gods[name]){
    res.send(gods)
  } else {
    res.status(500)
  }
})
*/