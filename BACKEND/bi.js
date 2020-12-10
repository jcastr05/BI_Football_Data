//Variables generales a utilizar
var express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
var app = express();
app.use(cors());
app.use(bodyParser.json())
const neo4j = require('neo4j-driver')
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "a"))
const session = driver.session()
const respuesta = {}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/343', (req, res) => {
  console.log('Se ha recibido una petición post en 343')
  res.send('Hola')
})

app.post('/352', (req, res) => {
  console.log('Se ha recibido una petición post en 352')
  res.send('Hola')
})

app.post('/41212', (req, res) => {

  console.log('Se ha recibido una petición post en 41212')
  let datos = []
  console.log(req)
  //En esta parte del codigo estamos recogiendo los datos que nos envía el frontend de las preferencias de cada jugador en cada estilo de juego.
  var team = req.body.z12
  var value = req.body.z13

  //Aqui voy a poner las diferentes cadenas de texto que se pueden recibir tanto individuales como colectivas
  var perfect = "Encaja perfectamente en esta táctica"
  var good = "Encaja bien en esta táctica"
  var bad = "Encaja mal en esta táctica"
  var terrible = "No encaja en esta táctica"
  var posesionLenta = "El estilo recomendado es posesión lenta."
  var posesionRapida = "El estilo recomendado es posesión rápida."
  var gegenpressing = "El estilo recomendado es gegenpressing."
  var counter = "El estilo recomendado es contraataque."
  var bandas = "El estilo recomendado es ataque por las bandas."
  var catenaccio = "El estilo recomendado es catenaccio."

  var estiloEquipo = ""
  //Ahora vamos a calcular cual es el estilo de juego del equipo
  if(team.localeCompare(posesionLenta) == 0){
    estiloEquipo = "POSESION LENTA"
  }
  else if(team.localeCompare(posesionRapida) == 0){
    estiloEquipo = "POSESION RAPIDA"
  }
  else if(team.localeCompare(gegenpressing) == 0){
    estiloEquipo = "GEGENPRESSING"
  }
  else if(team.localeCompare(counter) == 0){
    estiloEquipo = "CONTRAATAQUE"
  }
  else if(team.localeCompare(bandas) == 0){
    estiloEquipo = "ATAQUE POR BANDAS"
  }
  else{
    estiloEquipo = "CATENACCIO"
  }

  //Obtenemos el precio que ha introducido el usuario
  var valorJugador = ""
  if(value.localeCompare("do") == 0){
  valorJugador = "MUY BARATO"
  }
  else if(value.localeCompare("re") == 0){
    valorJugador = "BARATO"
  }
  else if(value.localeCompare("mi") == 0){
    valorJugador = "CARO"
  }
  else{
    valorJugador = "MUY CARO"
  }

  //Arrays para recoger a los jugadores
  let portero = []
  let central = []
  let lateralDerecho = []
  let lateralIzquierdo = []
  let pivote = []
  let mediocentro = []
  let mediapunta = []
  let delantero = []


  //Las queries que vamos a realizar
  let queryPor = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'PO' AND p.Type = '"
  let queryLatIzq = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'LI' AND p.Type = '"
  let queryLatDer = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'LD' AND p.Type = '"
  let queryCen = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'DC' AND p.Type = '"
  let queryPiv = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'PI' AND p.Type = '"
  let queryMed = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'MC' AND p.Type = '"
  let queryMep = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'MP' AND p.Type = '"
  let queryDel = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'DL' AND p.Type = '"

  //Concatenamos el estilo y el valor
  queryPor = queryPor.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryLatIzq = queryLatIzq.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryLatDer = queryLatDer.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryCen = queryCen.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryPiv = queryPiv.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryMed = queryMed.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryMep = queryMep.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryDel = queryDel.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1") 


  //Este es el bloque de todas las llamadas a la base de datos, al final de las llamadas es donde encontraremos la logica del backend
  session
  .run(queryPor)
  .then(function(result){
    result.records.forEach(function(record){
      portero.push(record._fields[0].properties.Nombre);portero.push(record._fields[0].properties.age.low);portero.push(record._fields[0].properties.pace.low);portero.push(record._fields[0].properties.stamina.low);portero.push(record._fields[0].properties.strength.low);portero.push(record._fields[0].properties.shooting.low);portero.push(record._fields[0].properties.passing.low);portero.push(record._fields[0].properties.dribbling.low);portero.push(record._fields[0].properties.marking.low);portero.push(record._fields[0].properties.tackling.low);portero.push(record._fields[0].properties.heading.low);portero.push(record._fields[0].properties.decisions.low);portero.push(record._fields[0].properties.positioning.low);portero.push(record._fields[0].properties.stopping.low);portero.push(record._fields[0].properties.value.low);portero.push(record._fields[0].properties.team);
    })
    session
      .run(queryLatIzq)
      .then(function(result){
      result.records.forEach(function(record){
      lateralIzquierdo.push(record._fields[0].properties.Nombre);lateralIzquierdo.push(record._fields[0].properties.age.low);lateralIzquierdo.push(record._fields[0].properties.pace.low);lateralIzquierdo.push(record._fields[0].properties.stamina.low);lateralIzquierdo.push(record._fields[0].properties.strength.low);lateralIzquierdo.push(record._fields[0].properties.shooting.low);lateralIzquierdo.push(record._fields[0].properties.passing.low);lateralIzquierdo.push(record._fields[0].properties.dribbling.low);lateralIzquierdo.push(record._fields[0].properties.marking.low);lateralIzquierdo.push(record._fields[0].properties.tackling.low);lateralIzquierdo.push(record._fields[0].properties.heading.low);lateralIzquierdo.push(record._fields[0].properties.decisions.low);lateralIzquierdo.push(record._fields[0].properties.positioning.low);lateralIzquierdo.push(record._fields[0].properties.stopping.low);lateralIzquierdo.push(record._fields[0].properties.value.low);lateralIzquierdo.push(record._fields[0].properties.team);
      })
      session
        .run(queryCen)
        .then(function(result){
        result.records.forEach(function(record){
        central.push(record._fields[0].properties.Nombre);central.push(record._fields[0].properties.age.low);central.push(record._fields[0].properties.pace.low);central.push(record._fields[0].properties.stamina.low);central.push(record._fields[0].properties.strength.low);central.push(record._fields[0].properties.shooting.low);central.push(record._fields[0].properties.passing.low);central.push(record._fields[0].properties.dribbling.low);central.push(record._fields[0].properties.marking.low);central.push(record._fields[0].properties.tackling.low);central.push(record._fields[0].properties.heading.low);central.push(record._fields[0].properties.decisions.low);central.push(record._fields[0].properties.positioning.low);central.push(record._fields[0].properties.stopping.low);central.push(record._fields[0].properties.value.low);central.push(record._fields[0].properties.team);
        })  
        session
          .run(queryLatDer)
          .then(function(result){
          result.records.forEach(function(record){
          lateralDerecho.push(record._fields[0].properties.Nombre);lateralDerecho.push(record._fields[0].properties.age.low);lateralDerecho.push(record._fields[0].properties.pace.low);lateralDerecho.push(record._fields[0].properties.stamina.low);lateralDerecho.push(record._fields[0].properties.strength.low);lateralDerecho.push(record._fields[0].properties.shooting.low);lateralDerecho.push(record._fields[0].properties.passing.low);lateralDerecho.push(record._fields[0].properties.dribbling.low);lateralDerecho.push(record._fields[0].properties.marking.low);lateralDerecho.push(record._fields[0].properties.tackling.low);lateralDerecho.push(record._fields[0].properties.heading.low);lateralDerecho.push(record._fields[0].properties.decisions.low);lateralDerecho.push(record._fields[0].properties.positioning.low);lateralDerecho.push(record._fields[0].properties.stopping.low);lateralDerecho.push(record._fields[0].properties.value.low);lateralDerecho.push(record._fields[0].properties.team);
          })
          session
            .run(queryPiv)
            .then(function(result){
            result.records.forEach(function(record){
            pivote.push(record._fields[0].properties.Nombre);pivote.push(record._fields[0].properties.age.low);pivote.push(record._fields[0].properties.pace.low);pivote.push(record._fields[0].properties.stamina.low);pivote.push(record._fields[0].properties.strength.low);pivote.push(record._fields[0].properties.shooting.low);pivote.push(record._fields[0].properties.passing.low);pivote.push(record._fields[0].properties.dribbling.low);pivote.push(record._fields[0].properties.marking.low);pivote.push(record._fields[0].properties.tackling.low);pivote.push(record._fields[0].properties.heading.low);pivote.push(record._fields[0].properties.decisions.low);pivote.push(record._fields[0].properties.positioning.low);pivote.push(record._fields[0].properties.stopping.low);pivote.push(record._fields[0].properties.value.low);pivote.push(record._fields[0].properties.team);           
            })  
            session
              .run(queryMed)
              .then(function(result){
              result.records.forEach(function(record){
              mediocentro.push(record._fields[0].properties.Nombre);mediocentro.push(record._fields[0].properties.age.low);mediocentro.push(record._fields[0].properties.pace.low);mediocentro.push(record._fields[0].properties.stamina.low);mediocentro.push(record._fields[0].properties.strength.low);mediocentro.push(record._fields[0].properties.shooting.low);mediocentro.push(record._fields[0].properties.passing.low);mediocentro.push(record._fields[0].properties.dribbling.low);mediocentro.push(record._fields[0].properties.marking.low);mediocentro.push(record._fields[0].properties.tackling.low);mediocentro.push(record._fields[0].properties.heading.low);mediocentro.push(record._fields[0].properties.decisions.low);mediocentro.push(record._fields[0].properties.positioning.low);mediocentro.push(record._fields[0].properties.stopping.low);mediocentro.push(record._fields[0].properties.value.low);mediocentro.push(record._fields[0].properties.team);
              })   
              session
                  .run(queryMep)
                  .then(function(result){
                  result.records.forEach(function(record){
                  mediapunta.push(record._fields[0].properties.Nombre);mediapunta.push(record._fields[0].properties.age.low);mediapunta.push(record._fields[0].properties.pace.low);mediapunta.push(record._fields[0].properties.stamina.low);mediapunta.push(record._fields[0].properties.strength.low);mediapunta.push(record._fields[0].properties.shooting.low);mediapunta.push(record._fields[0].properties.passing.low);mediapunta.push(record._fields[0].properties.dribbling.low);mediapunta.push(record._fields[0].properties.marking.low);mediapunta.push(record._fields[0].properties.tackling.low);mediapunta.push(record._fields[0].properties.heading.low);mediapunta.push(record._fields[0].properties.decisions.low);mediapunta.push(record._fields[0].properties.positioning.low);mediapunta.push(record._fields[0].properties.stopping.low);mediapunta.push(record._fields[0].properties.value.low);mediapunta.push(record._fields[0].properties.team);
                  })
                  session
                    .run(queryDel)
                    .then(function(result){
                    result.records.forEach(function(record){
                    delantero.push(record._fields[0].properties.Nombre);delantero.push(record._fields[0].properties.age.low);delantero.push(record._fields[0].properties.pace.low);delantero.push(record._fields[0].properties.stamina.low);delantero.push(record._fields[0].properties.strength.low);delantero.push(record._fields[0].properties.shooting.low);delantero.push(record._fields[0].properties.passing.low);delantero.push(record._fields[0].properties.dribbling.low);delantero.push(record._fields[0].properties.marking.low);delantero.push(record._fields[0].properties.tackling.low);delantero.push(record._fields[0].properties.heading.low);delantero.push(record._fields[0].properties.decisions.low);delantero.push(record._fields[0].properties.positioning.low);delantero.push(record._fields[0].properties.stopping.low);delantero.push(record._fields[0].properties.value.low);delantero.push(record._fields[0].properties.team); 
                    })
                    })
//Aquí vamos a incluir la lógica del programa
.then(function(result){


  //Booleanas que nos dicen si tenemos que enviar datos o no al frontend
  var porteroMostrar = false
  var lateralDerechoMostrar = false
  var lateralizquierdoMostrar = false
  var central1Mostrar = false
  var central2Mostrar = false
  var pivoteMostrar = false
  var mediocentro1Mostrar = false
  var mediocentro2Mostrar = false
  var mediapuntaMostrar = false
  var delantero1Mostrar = false
  var delantero2Mostrar = false

  //Portero
  var posicion = req.body.z1.a
  var poslen = req.body.z1.b
  var posRap = req.body.z1.c
  var gegen = req.body.z1.d
  var count = req.body.z1.e
  var ban = req.body.z1.f
  var caten = req.body.z1.g

//Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      porteroMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      porteroMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      porteroMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      porteroMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      porteroMostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      porteroMostrar = true
    }
  }

  //Lateral izquierdo
  posicion = req.body.z2.a
  poslen = req.body.z2.b
  posRap = req.body.z2.c
  gegen = req.body.z2.d
  count = req.body.z2.e
  ban = req.body.z2.f
  caten = req.body.z2.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      lateralizquierdoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      lateralizquierdoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      lateralizquierdoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      lateralizquierdoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      lateralizquierdoMostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      lateralizquierdoMostrar = true
    }
  }

  //Central 1
  posicion = req.body.z3.a
  poslen = req.body.z3.b
  posRap = req.body.z3.c
  gegen = req.body.z3.d
  count = req.body.z3.e
  ban = req.body.z3.f
  caten = req.body.z3.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      central1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      central1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      central1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      central1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      central1Mostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      central1Mostrar = true
    }
  }

  //Central 2
  posicion = req.body.z4.a
  poslen = req.body.z4.b
  posRap = req.body.z4.c
  gegen = req.body.z4.d
  count = req.body.z4.e
  ban = req.body.z4.f
  caten = req.body.z4.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      central2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      central2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      central2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      central2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      central2Mostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      central2Mostrar = true
    }
  }

  //Laterañ derecho
  posicion = req.body.z5.a
  poslen = req.body.z5.b
  posRap = req.body.z5.c
  gegen = req.body.z5.d
  count = req.body.z5.e
  ban = req.body.z5.f
  caten = req.body.z5.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      lateralDerechoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      lateralDerechoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      lateralDerechoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      lateralDerechoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      lateralDerechoMostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      lateralDerechoMostrar = true
    }
  }

  //Pivote
  posicion = req.body.z6.a
  poslen = req.body.z6.b
  posRap = req.body.z6.c
  gegen = req.body.z6.d
  count = req.body.z6.e
  ban = req.body.z6.f
  caten = req.body.z6.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      pivoteMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      pivoteMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      pivoteMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      pivoteMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      pivoteMostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      pivoteMostrar = true
    }
  }

  //Mediocentro 1
  posicion = req.body.z7.a
  poslen = req.body.z7.b
  posRap = req.body.z7.c
  gegen = req.body.z7.d
  count = req.body.z7.e
  ban = req.body.z7.f
  caten = req.body.z7.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      mediocentro1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      mediocentro1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      mediocentro1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      mediocentro1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      mediocentro1Mostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      mediocentro1Mostrar = true
    }
  }

  //Mediocentro 2
  posicion = req.body.z8.a
  poslen = req.body.z8.b
  posRap = req.body.z8.c
  gegen = req.body.z8.d
  count = req.body.z8.e
  ban = req.body.z8.f
  caten = req.body.z8.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      mediocentro2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      mediocentro2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      mediocentro2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      mediocentro2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      mediocentro2Mostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      mediocentro2Mostrar = true
    }
  }

  //Extremo izquierdo
  posicion = req.body.z9.a
  poslen = req.body.z9.b
  posRap = req.body.z9.c
  gegen = req.body.z9.d
  count = req.body.z9.e
  ban = req.body.z9.f
  caten = req.body.z9.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      mediapuntaMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      mediapuntaMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      mediapuntaMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      mediapuntaMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      mediapuntaMostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      mediapuntaMostrar = true
    }
  }

  //Extremo derecho
  posicion = req.body.z10.a
  poslen = req.body.z10.b
  posRap = req.body.z10.c
  gegen = req.body.z10.d
  count = req.body.z10.e
  ban = req.body.z10.f
  caten = req.body.z10.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      delantero1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      delantero1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      delantero1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      delantero1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      delantero1Mostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      delantero1Mostrar = true
    }
  }

  //Delantero
  posicion = req.body.z11.a
  poslen = req.body.z11.b
  posRap = req.body.z11.c
  gegen = req.body.z11.d
  count = req.body.z11.e
  ban = req.body.z11.f
  caten = req.body.z11.g

    //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      delantero2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      delantero2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      delantero2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      delantero2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      delantero2Mostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      delantero2Mostrar = true
    }
  }

  //Ahora vamos a construir el JSON de vuelta al frontend
  var arrayCeros = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  //Si los arrays están vacíos entonces tenemos que decir que no se encontró en la DB ningún dato
  var porteroEmpty = false
  var lateralDerechoEmpty = false
  var lateralIzquierdoEmpty = false
  var centralEmpty = false
  var pivoteEmpty = false
  var mediocentroEmpty = false
  var mediapuntaEmpty = false
  var delanteroEmpty = false

  if(portero.length == 0){
    porteroEmpty = true
  }
  if(lateralDerecho.length == 0){
    lateralDerechoEmpty = true
  }
  if(lateralIzquierdo.length == 0){
    lateralIzquierdoEmpty = true
  }
  if(central.length == 0){
    centralEmpty = true
  }
  if(pivote.length == 0){
    pivoteEmpty = true
  }
  if(mediocentro.length == 0){
    mediocentroEmpty = true
  }
  if(mediapunta.length == 0){
    mediapuntaEmpty = true
  }

  if(delantero.length == 0){
    delanteroEmpty = true
  }

  var notFound = "No se ha encontrado ningún elemento en la base de datos que mejore el resultado."
  var innecesario = "El jugador encaja con la táctica, por lo que no es necesario ofrecer ninguna recomendación."
  var recomendacion = "La recomendación de jugador que encaja mejor en la táctica es la siguiente:"
  var string = ""
  //Ahora que ya tenemos las boleanas podemos formas la query
  //Portero
  //Si la booleana es true significa que el jugador es mejorable
  if(porteroMostrar == true){
    //Si portero está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
    if(porteroEmpty == true){
      string = notFound
      respuesta.portero = {string, arrayCeros}
    }
    else{
      string = recomendacion
      respuesta.portero = {string, portero}
    }
  }
  //Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo portero
  else{
    string = innecesario
    respuesta.portero = {string, arrayCeros}
  }
  //Lateral Izquierdo
  //Si la booleana es true significa que el jugador es mejorable
  if(lateralizquierdoMostrar == true){
    //Si lateral está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
    if(lateralIzquierdoEmpty == true){
      string = notFound
      respuesta.lateralIzquierdo = {string, arrayCeros}
    }
    else{
      string = recomendacion
      respuesta.lateralIzquierdo = {string, lateralIzquierdo}
    }
  }
  //Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo lateral
  else{
    string = innecesario
    respuesta.lateralIzquierdo = {string, arrayCeros}
  }
  //Lateral Derecho
  //Si la booleana es true significa que el jugador es mejorable
  if(lateralDerechoMostrar == true){
    //Si lateral está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
    if(lateralDerechoEmpty == true){
      string = notFound
      respuesta.lateralDerecho = {string, arrayCeros}
    }
    else{
      string = recomendacion
      respuesta.lateralDerecho = {string, lateralDerecho}
    }
  }
  //Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo lateral
  else{
    string = innecesario
    respuesta.lateralDerecho = {string, arrayCeros}
  }
  //Central
  //Si la booleana es true significa que el jugador es mejorable (hay dos centrales así que con que uno sea mejorable ya lo añadimos)
  if(central1Mostrar == true || central2Mostrar == true){
    //Si central está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
    if(centralEmpty == true){
      string = notFound
      respuesta.central = {string, arrayCeros}
    }
    else{
      string = recomendacion
      respuesta.central = {string, central}
    }
  }
  //Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo central
  else{
    string = innecesario
    respuesta.central = {string, arrayCeros}
  }
  //Pivote
  //Si la booleana es true significa que el jugador es mejorable 
  if(pivoteMostrar == true){
    //Si pivote está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
    if(pivoteEmpty == true){
      string = notFound
      respuesta.pivote = {string, arrayCeros}
    }
    else{
      string = recomendacion
      respuesta.pivote = {string, pivote}
    }
  }
  //Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo pivote
  else{
    string = innecesario
    respuesta.pivote = {string, arrayCeros}
  }
  //Mediocentro
  //Si la booleana es true significa que el jugador es mejorable (hay dos mediocentros así que con que uno sea mejorable ya lo añadimos)
  if(mediocentro1Mostrar == true || mediocentro2Mostrar == true){
    //Si mediocentro está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
    if(mediocentroEmpty == true){
      string = notFound
      respuesta.mediocentro = {string, arrayCeros}
    }
    else{
      string = recomendacion
      respuesta.mediocentro = {string, mediocentro}
    }
  }
  //Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo mediocentro
  else{
    string = innecesario
    respuesta.mediocentro = {string, arrayCeros}
  }
  //Mediapunta
  //Si la booleana es true significa que el jugador es mejorable 
  if(mediapuntaMostrar == true){
    //Si mediapunta está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
    if(mediapuntaEmpty == true){
      string = notFound
      respuesta.mediapunta = {string, arrayCeros}
    }
    else{
      string = recomendacion
      respuesta.mediapunta = {string, mediapunta}
    }
  }
  //Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo mediapunta
  else{
    string = innecesario
    respuesta.mediapunta = {string, arrayCeros}
  }
  //Delantero
  //Si la booleana es true significa que el jugador es mejorable 
  if(delantero1Mostrar == true || delantero2Mostrar == true){
    //Si delantero está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
    if(delanteroEmpty == true){
      string = notFound
      respuesta.delantero = {string, arrayCeros}
    }
    else{
      string = recomendacion
      respuesta.delantero = {string, delantero}
    }
  }
  //Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo delantero
  else{
    string = innecesario
    respuesta.delantero = {string, arrayCeros}
  }
  console.log(respuesta)
  res.send(respuesta)

                  })
                    
                  
                })
              })
            })
          })
        })
      })
      .catch(function(error){
      })

  })

})

//En esta funcion recibiremos los post a la direccion de 4-3-3
app.post('/433', (req, res) => {

  console.log('Se ha recibido una petición post en 433')
  let datos = []

  //En esta parte del codigo estamos recogiendo los datos que nos envía el frontend de las preferencias de cada jugador en cada estilo de juego.
  var team = req.body.z12
  var value = req.body.z13

  //Aqui voy a poner las diferentes cadenas de texto que se pueden recibir tanto individuales como colectivas
  var perfect = "Encaja perfectamente en esta táctica"
  var good = "Encaja bien en esta táctica"
  var bad = "Encaja mal en esta táctica"
  var terrible = "No encaja en esta táctica"
  var posesionLenta = "El estilo recomendado es posesión lenta."
  var posesionRapida = "El estilo recomendado es posesión rápida."
  var gegenpressing = "El estilo recomendado es gegenpressing."
  var counter = "El estilo recomendado es contraataque."
  var bandas = "El estilo recomendado es ataque por las bandas."
  var catenaccio = "El estilo recomendado es catenaccio."

  var estiloEquipo = ""
  //Ahora vamos a calcular cual es el estilo de juego del equipo
  if(team.localeCompare(posesionLenta) == 0){
    estiloEquipo = "POSESION LENTA"
  }
  else if(team.localeCompare(posesionRapida) == 0){
    estiloEquipo = "POSESION RAPIDA"
  }
  else if(team.localeCompare(gegenpressing) == 0){
    estiloEquipo = "GEGENPRESSING"
  }
  else if(team.localeCompare(counter) == 0){
    estiloEquipo = "CONTRAATAQUE"
  }
  else if(team.localeCompare(bandas) == 0){
    estiloEquipo = "ATAQUE POR BANDAS"
  }
  else{
    estiloEquipo = "CATENACCIO"
  }

  //Obtenemos el precio que ha introducido el usuario
  var valorJugador = ""
  if(value.localeCompare("do") == 0){
  valorJugador = "MUY BARATO"
  }
  else if(value.localeCompare("re") == 0){
    valorJugador = "BARATO"
  }
  else if(value.localeCompare("mi") == 0){
    valorJugador = "CARO"
  }
  else{
    valorJugador = "MUY CARO"
  }
  //Arrays para recoger a los jugadores
  let portero = []
  let central = []
  let lateralDerecho = []
  let lateralIzquierdo = []
  let pivote = []
  let mediocentro = []
  let extremoDerecho = []
  let extremoIzquierdo = []
  let delantero = []

  //Las queries que vamos a realizar
  let queryPor = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'PO' AND p.Type = '"
  let queryLatIzq = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'LI' AND p.Type = '"
  let queryLatDer = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'LD' AND p.Type = '"
  let queryCen = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'DC' AND p.Type = '"
  let queryPiv = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'PI' AND p.Type = '"
  let queryMed = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'MC' AND p.Type = '"
  let queryExtIzq = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'EI' AND p.Type = '"
  let queryExtDer = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'ED' AND p.Type = '"
  let queryDel = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'DL' AND p.Type = '"

  //Concatenamos el estilo y el valor
  queryPor = queryPor.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryLatIzq = queryLatIzq.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryLatDer = queryLatDer.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryCen = queryCen.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryPiv = queryPiv.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryMed = queryMed.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryExtIzq = queryExtIzq.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryExtDer = queryExtDer.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryDel = queryDel.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1") 

  //Este es el bloque de todas las llamadas a la base de datos, al final de las llamadas es donde encontraremos la logica del backend
  session
  .run(queryPor)
  .then(function(result){
    result.records.forEach(function(record){
      portero.push(record._fields[0].properties.Nombre);portero.push(record._fields[0].properties.age.low);portero.push(record._fields[0].properties.pace.low);portero.push(record._fields[0].properties.stamina.low);portero.push(record._fields[0].properties.strength.low);portero.push(record._fields[0].properties.shooting.low);portero.push(record._fields[0].properties.passing.low);portero.push(record._fields[0].properties.dribbling.low);portero.push(record._fields[0].properties.marking.low);portero.push(record._fields[0].properties.tackling.low);portero.push(record._fields[0].properties.heading.low);portero.push(record._fields[0].properties.decisions.low);portero.push(record._fields[0].properties.positioning.low);portero.push(record._fields[0].properties.stopping.low);portero.push(record._fields[0].properties.value.low);portero.push(record._fields[0].properties.team);
    })
    session
      .run(queryLatIzq)
      .then(function(result){
      result.records.forEach(function(record){
      lateralIzquierdo.push(record._fields[0].properties.Nombre);lateralIzquierdo.push(record._fields[0].properties.age.low);lateralIzquierdo.push(record._fields[0].properties.pace.low);lateralIzquierdo.push(record._fields[0].properties.stamina.low);lateralIzquierdo.push(record._fields[0].properties.strength.low);lateralIzquierdo.push(record._fields[0].properties.shooting.low);lateralIzquierdo.push(record._fields[0].properties.passing.low);lateralIzquierdo.push(record._fields[0].properties.dribbling.low);lateralIzquierdo.push(record._fields[0].properties.marking.low);lateralIzquierdo.push(record._fields[0].properties.tackling.low);lateralIzquierdo.push(record._fields[0].properties.heading.low);lateralIzquierdo.push(record._fields[0].properties.decisions.low);lateralIzquierdo.push(record._fields[0].properties.positioning.low);lateralIzquierdo.push(record._fields[0].properties.stopping.low);lateralIzquierdo.push(record._fields[0].properties.value.low);lateralIzquierdo.push(record._fields[0].properties.team);
      })
      session
        .run(queryCen)
        .then(function(result){
        result.records.forEach(function(record){
        central.push(record._fields[0].properties.Nombre);central.push(record._fields[0].properties.age.low);central.push(record._fields[0].properties.pace.low);central.push(record._fields[0].properties.stamina.low);central.push(record._fields[0].properties.strength.low);central.push(record._fields[0].properties.shooting.low);central.push(record._fields[0].properties.passing.low);central.push(record._fields[0].properties.dribbling.low);central.push(record._fields[0].properties.marking.low);central.push(record._fields[0].properties.tackling.low);central.push(record._fields[0].properties.heading.low);central.push(record._fields[0].properties.decisions.low);central.push(record._fields[0].properties.positioning.low);central.push(record._fields[0].properties.stopping.low);central.push(record._fields[0].properties.value.low);central.push(record._fields[0].properties.team);
        })  
        session
          .run(queryLatDer)
          .then(function(result){
          result.records.forEach(function(record){
          lateralDerecho.push(record._fields[0].properties.Nombre);lateralDerecho.push(record._fields[0].properties.age.low);lateralDerecho.push(record._fields[0].properties.pace.low);lateralDerecho.push(record._fields[0].properties.stamina.low);lateralDerecho.push(record._fields[0].properties.strength.low);lateralDerecho.push(record._fields[0].properties.shooting.low);lateralDerecho.push(record._fields[0].properties.passing.low);lateralDerecho.push(record._fields[0].properties.dribbling.low);lateralDerecho.push(record._fields[0].properties.marking.low);lateralDerecho.push(record._fields[0].properties.tackling.low);lateralDerecho.push(record._fields[0].properties.heading.low);lateralDerecho.push(record._fields[0].properties.decisions.low);lateralDerecho.push(record._fields[0].properties.positioning.low);lateralDerecho.push(record._fields[0].properties.stopping.low);lateralDerecho.push(record._fields[0].properties.value.low);lateralDerecho.push(record._fields[0].properties.team);
          })
          session
            .run(queryPiv)
            .then(function(result){
            result.records.forEach(function(record){
            pivote.push(record._fields[0].properties.Nombre);pivote.push(record._fields[0].properties.age.low);pivote.push(record._fields[0].properties.pace.low);pivote.push(record._fields[0].properties.stamina.low);pivote.push(record._fields[0].properties.strength.low);pivote.push(record._fields[0].properties.shooting.low);pivote.push(record._fields[0].properties.passing.low);pivote.push(record._fields[0].properties.dribbling.low);pivote.push(record._fields[0].properties.marking.low);pivote.push(record._fields[0].properties.tackling.low);pivote.push(record._fields[0].properties.heading.low);pivote.push(record._fields[0].properties.decisions.low);pivote.push(record._fields[0].properties.positioning.low);pivote.push(record._fields[0].properties.stopping.low);pivote.push(record._fields[0].properties.value.low);pivote.push(record._fields[0].properties.team);           
            })  
            session
              .run(queryMed)
              .then(function(result){
              result.records.forEach(function(record){
              mediocentro.push(record._fields[0].properties.Nombre);mediocentro.push(record._fields[0].properties.age.low);mediocentro.push(record._fields[0].properties.pace.low);mediocentro.push(record._fields[0].properties.stamina.low);mediocentro.push(record._fields[0].properties.strength.low);mediocentro.push(record._fields[0].properties.shooting.low);mediocentro.push(record._fields[0].properties.passing.low);mediocentro.push(record._fields[0].properties.dribbling.low);mediocentro.push(record._fields[0].properties.marking.low);mediocentro.push(record._fields[0].properties.tackling.low);mediocentro.push(record._fields[0].properties.heading.low);mediocentro.push(record._fields[0].properties.decisions.low);mediocentro.push(record._fields[0].properties.positioning.low);mediocentro.push(record._fields[0].properties.stopping.low);mediocentro.push(record._fields[0].properties.value.low);mediocentro.push(record._fields[0].properties.team);
              })  
              session
                .run(queryExtIzq)
                .then(function(result){
                result.records.forEach(function(record){
                extremoIzquierdo.push(record._fields[0].properties.Nombre);extremoIzquierdo.push(record._fields[0].properties.age.low);extremoIzquierdo.push(record._fields[0].properties.pace.low);extremoIzquierdo.push(record._fields[0].properties.stamina.low);extremoIzquierdo.push(record._fields[0].properties.strength.low);extremoIzquierdo.push(record._fields[0].properties.shooting.low);extremoIzquierdo.push(record._fields[0].properties.passing.low);extremoIzquierdo.push(record._fields[0].properties.dribbling.low);extremoIzquierdo.push(record._fields[0].properties.marking.low);extremoIzquierdo.push(record._fields[0].properties.tackling.low);extremoIzquierdo.push(record._fields[0].properties.heading.low);extremoIzquierdo.push(record._fields[0].properties.decisions.low);extremoIzquierdo.push(record._fields[0].properties.positioning.low);extremoIzquierdo.push(record._fields[0].properties.stopping.low);extremoIzquierdo.push(record._fields[0].properties.value.low);extremoIzquierdo.push(record._fields[0].properties.team);
                })  
              session
                  .run(queryExtDer)
                  .then(function(result){
                  result.records.forEach(function(record){
                  extremoDerecho.push(record._fields[0].properties.Nombre);extremoDerecho.push(record._fields[0].properties.age.low);extremoDerecho.push(record._fields[0].properties.pace.low);extremoDerecho.push(record._fields[0].properties.stamina.low);extremoDerecho.push(record._fields[0].properties.strength.low);extremoDerecho.push(record._fields[0].properties.shooting.low);extremoDerecho.push(record._fields[0].properties.passing.low);extremoDerecho.push(record._fields[0].properties.dribbling.low);extremoDerecho.push(record._fields[0].properties.marking.low);extremoDerecho.push(record._fields[0].properties.tackling.low);extremoDerecho.push(record._fields[0].properties.heading.low);extremoDerecho.push(record._fields[0].properties.decisions.low);extremoDerecho.push(record._fields[0].properties.positioning.low);extremoDerecho.push(record._fields[0].properties.stopping.low);extremoDerecho.push(record._fields[0].properties.value.low);extremoDerecho.push(record._fields[0].properties.team);
                  })
                  session
                    .run(queryDel)
                    .then(function(result){
                    result.records.forEach(function(record){
                    delantero.push(record._fields[0].properties.Nombre);delantero.push(record._fields[0].properties.age.low);delantero.push(record._fields[0].properties.pace.low);delantero.push(record._fields[0].properties.stamina.low);delantero.push(record._fields[0].properties.strength.low);delantero.push(record._fields[0].properties.shooting.low);delantero.push(record._fields[0].properties.passing.low);delantero.push(record._fields[0].properties.dribbling.low);delantero.push(record._fields[0].properties.marking.low);delantero.push(record._fields[0].properties.tackling.low);delantero.push(record._fields[0].properties.heading.low);delantero.push(record._fields[0].properties.decisions.low);delantero.push(record._fields[0].properties.positioning.low);delantero.push(record._fields[0].properties.stopping.low);delantero.push(record._fields[0].properties.value.low);delantero.push(record._fields[0].properties.team); 
                    })
                    })
//Aquí vamos a incluir la lógica del programa
.then(function(result){

  //Booleanas que nos dicen si tenemos que enviar datos o no al frontend
  var porteroMostrar = false
  var lateralDerechoMostrar = false
  var lateralizquierdoMostrar = false
  var central1Mostrar = false
  var central2Mostrar = false
  var pivoteMostrar = false
  var mediocentro1Mostrar = false
  var mediocentro2Mostrar = false
  var extremoDerechoMostrar = false
  var extremoIzquierdoMostrar = false
  var delanteroMostrar = false

  //Portero
  var posicion = req.body.z1.a
  var poslen = req.body.z1.b
  var posRap = req.body.z1.c
  var gegen = req.body.z1.d
  var count = req.body.z1.e
  var ban = req.body.z1.f
  var caten = req.body.z1.g

//Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      porteroMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      porteroMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      porteroMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      porteroMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      porteroMostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      porteroMostrar = true
    }
  }

  //Lateral izquierdo
  posicion = req.body.z2.a
  poslen = req.body.z2.b
  posRap = req.body.z2.c
  gegen = req.body.z2.d
  count = req.body.z2.e
  ban = req.body.z2.f
  caten = req.body.z2.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      lateralizquierdoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      lateralizquierdoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      lateralizquierdoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      lateralizquierdoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      lateralizquierdoMostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      lateralizquierdoMostrar = true
    }
  }

  //Central 1
  posicion = req.body.z3.a
  poslen = req.body.z3.b
  posRap = req.body.z3.c
  gegen = req.body.z3.d
  count = req.body.z3.e
  ban = req.body.z3.f
  caten = req.body.z3.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      central1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      central1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      central1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      central1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      central1Mostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      central1Mostrar = true
    }
  }

  //Central 2
  posicion = req.body.z4.a
  poslen = req.body.z4.b
  posRap = req.body.z4.c
  gegen = req.body.z4.d
  count = req.body.z4.e
  ban = req.body.z4.f
  caten = req.body.z4.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      central2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      central2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      central2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      central2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      central2Mostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      central2Mostrar = true
    }
  }

  //Laterañ derecho
  posicion = req.body.z5.a
  poslen = req.body.z5.b
  posRap = req.body.z5.c
  gegen = req.body.z5.d
  count = req.body.z5.e
  ban = req.body.z5.f
  caten = req.body.z5.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      lateralDerechoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      lateralDerechoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      lateralDerechoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      lateralDerechoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      lateralDerechoMostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      lateralDerechoMostrar = true
    }
  }

  //Pivote
  posicion = req.body.z6.a
  poslen = req.body.z6.b
  posRap = req.body.z6.c
  gegen = req.body.z6.d
  count = req.body.z6.e
  ban = req.body.z6.f
  caten = req.body.z6.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      pivoteMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      pivoteMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      pivoteMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      pivoteMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      pivoteMostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      pivoteMostrar = true
    }
  }

  //Mediocentro 1
  posicion = req.body.z7.a
  poslen = req.body.z7.b
  posRap = req.body.z7.c
  gegen = req.body.z7.d
  count = req.body.z7.e
  ban = req.body.z7.f
  caten = req.body.z7.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      mediocentro1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      mediocentro1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      mediocentro1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      mediocentro1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      mediocentro1Mostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      mediocentro1Mostrar = true
    }
  }

  //Mediocentro 2
  posicion = req.body.z8.a
  poslen = req.body.z8.b
  posRap = req.body.z8.c
  gegen = req.body.z8.d
  count = req.body.z8.e
  ban = req.body.z8.f
  caten = req.body.z8.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      mediocentro2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      mediocentro2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      mediocentro2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      mediocentro2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      mediocentro2Mostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      mediocentro2Mostrar = true
    }
  }

  //Extremo izquierdo
  posicion = req.body.z9.a
  poslen = req.body.z9.b
  posRap = req.body.z9.c
  gegen = req.body.z9.d
  count = req.body.z9.e
  ban = req.body.z9.f
  caten = req.body.z9.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      extremoIzquierdoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      extremoIzquierdoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      extremoIzquierdoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      extremoIzquierdoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      extremoIzquierdoMostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      extremoIzquierdoMostrar = true
    }
  }

  //Extremo derecho
  posicion = req.body.z10.a
  poslen = req.body.z10.b
  posRap = req.body.z10.c
  gegen = req.body.z10.d
  count = req.body.z10.e
  ban = req.body.z10.f
  caten = req.body.z10.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      extremoDerechoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      extremoDerechoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      extremoDerechoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      extremoDerechoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      extremoDerechoMostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      extremoDerechoMostrar = true
    }
  }

  //Delantero
  posicion = req.body.z11.a
  poslen = req.body.z11.b
  posRap = req.body.z11.c
  gegen = req.body.z11.d
  count = req.body.z11.e
  ban = req.body.z11.f
  caten = req.body.z11.g

    //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      delanteroMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      delanteroMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      delanteroMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      delanteroMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      delanteroMostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      delanteroMostrar = true
    }
  }

  //Ahora vamos a construir el JSON de vuelta al frontend
  var arrayCeros = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  //Si los arrays están vacíos entonces tenemos que decir que no se encontró en la DB ningún dato
  var porteroEmpty = false
  var lateralDerechoEmpty = false
  var lateralIzquierdoEmpty = false
  var centralEmpty = false
  var pivoteEmpty = false
  var mediocentroEmpty = false
  var extremoDerechoEmpty = false
  var extremoIzquierdoEmpty = false
  var delanteroEmpty = false

  if(portero.length == 0){
    porteroEmpty = true
  }
  if(lateralDerecho.length == 0){
    lateralDerechoEmpty = true
  }
  if(lateralIzquierdo.length == 0){
    lateralIzquierdoEmpty = true
  }
  if(central.length == 0){
    centralEmpty = true
  }
  if(pivote.length == 0){
    pivoteEmpty = true
  }
  if(mediocentro.length == 0){
    mediocentroEmpty = true
  }
  if(extremoDerecho.length == 0){
    extremoDerechoEmpty = true
  }
  if(extremoIzquierdo.length == 0){
    extremoIzquierdoEmpty = true
  }
  if(delantero.length == 0){
    delanteroEmpty = true
  }

  var notFound = "No se ha encontrado ningún elemento en la base de datos que mejore el resultado."
  var innecesario = "El jugador encaja con la táctica, por lo que no es necesario ofrecer ninguna recomendación."
  var recomendacion = "La recomendación de jugador que encaja mejor en la táctica es la siguiente:"
  var string = ""
  //Ahora que ya tenemos las boleanas podemos formas la query
  //Portero
  //Si la booleana es true significa que el jugador es mejorable
  if(porteroMostrar == true){
    //Si portero está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
    if(porteroEmpty == true){
      string = notFound
      respuesta.portero = {string, arrayCeros}
    }
    else{
      string = recomendacion
      respuesta.portero = {string, portero}
    }
  }
  //Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo portero
  else{
    string = innecesario
    respuesta.portero = {string, arrayCeros}
  }
  //Lateral Izquierdo
  //Si la booleana es true significa que el jugador es mejorable
  if(lateralizquierdoMostrar == true){
    //Si lateral está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
    if(lateralIzquierdoEmpty == true){
      string = notFound
      respuesta.lateralIzquierdo = {string, arrayCeros}
    }
    else{
      string = recomendacion
      respuesta.lateralIzquierdo = {string, lateralIzquierdo}
    }
  }
  //Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo lateral
  else{
    string = innecesario
    respuesta.lateralIzquierdo = {string, arrayCeros}
  }
  //Lateral Derecho
  //Si la booleana es true significa que el jugador es mejorable
  if(lateralDerechoMostrar == true){
    //Si lateral está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
    if(lateralDerechoEmpty == true){
      string = notFound
      respuesta.lateralDerecho = {string, arrayCeros}
    }
    else{
      string = recomendacion
      respuesta.lateralDerecho = {string, lateralDerecho}
    }
  }
  //Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo lateral
  else{
    string = innecesario
    respuesta.lateralDerecho = {string, arrayCeros}
  }
  //Central
  //Si la booleana es true significa que el jugador es mejorable (hay dos centrales así que con que uno sea mejorable ya lo añadimos)
  if(central1Mostrar == true || central2Mostrar == true){
    //Si central está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
    if(centralEmpty == true){
      string = notFound
      respuesta.central = {string, arrayCeros}
    }
    else{
      string = recomendacion
      respuesta.central = {string, central}
    }
  }
  //Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo central
  else{
    string = innecesario
    respuesta.central = {string, arrayCeros}
  }
  //Pivote
  //Si la booleana es true significa que el jugador es mejorable 
  if(pivoteMostrar == true){
    //Si pivote está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
    if(pivoteEmpty == true){
      string = notFound
      respuesta.pivote = {string, arrayCeros}
    }
    else{
      string = recomendacion
      respuesta.pivote = {string, pivote}
    }
  }
  //Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo pivote
  else{
    string = innecesario
    respuesta.pivote = {string, arrayCeros}
  }
  //Mediocentro
  //Si la booleana es true significa que el jugador es mejorable (hay dos mediocentros así que con que uno sea mejorable ya lo añadimos)
  if(mediocentro1Mostrar == true || mediocentro2Mostrar == true){
    //Si mediocentro está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
    if(mediocentroEmpty == true){
      string = notFound
      respuesta.mediocentro = {string, arrayCeros}
    }
    else{
      string = recomendacion
      respuesta.mediocentro = {string, mediocentro}
    }
  }
  //Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo mediocentro
  else{
    string = innecesario
    respuesta.mediocentro = {string, arrayCeros}
  }
  //Extremo izquierdo
  //Si la booleana es true significa que el jugador es mejorable 
  if(extremoIzquierdoMostrar == true){
    //Si extremo está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
    if(extremoIzquierdoEmpty == true){
      string = notFound
      respuesta.extremoIzquierdo = {string, arrayCeros}
    }
    else{
      string = recomendacion
      respuesta.extremoIzquierdo = {string, extremoIzquierdo}
    }
  }
  //Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo extremo
  else{
    string = innecesario
    respuesta.extremoIzquierdo = {string, arrayCeros}
  }
  //Extremo derecho
  //Si la booleana es true significa que el jugador es mejorable 
  if(extremoDerechoMostrar == true){
    //Si extremo está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
    if(extremoDerechoEmpty == true){
      string = notFound
      respuesta.extremoDerecho = {string, arrayCeros}
    }
    else{
      string = recomendacion
      respuesta.extremoDerecho = {string, extremoDerecho}
    }
  }
  //Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo extremo
  else{
    string = innecesario
    respuesta.extremoDerecho = {string, arrayCeros}
  }
  //Delantero
  //Si la booleana es true significa que el jugador es mejorable 
  if(delanteroMostrar == true){
    //Si delantero está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
    if(delanteroEmpty == true){
      string = notFound
      respuesta.delantero = {string, arrayCeros}
    }
    else{
      string = recomendacion
      respuesta.delantero = {string, delantero}
    }
  }
  //Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo delantero
  else{
    string = innecesario
    respuesta.delantero = {string, arrayCeros}
  }
  console.log(respuesta)
  res.send(respuesta)

                  })
                    
                  })
                })
              })
            })
          })
        })
      })
      .catch(function(error){
      })

  })

})

//En esta funcion recibiremos los post a la direccion de 4-2-3-1
app.post('/4231', (req, res) => {

  console.log('Se ha recibido una petición post en 4231')
  let datos = []

  //También tenemos que recibir los datos del equipo completo para saber que jugadores encajan y cuales no y el valor que esperamos
  var team = req.body.z12
  var value = req.body.z13

 //Estas son las diferentes strings que se pueden recibir del frontend tanto en tactica de cada jugador como de todos los jugadores
 var perfect = "Encaja perfectamente en esta táctica"
 var good = "Encaja bien en esta táctica"
 var bad = "Encaja mal en esta táctica"
 var terrible = "No encaja en esta táctica"
 var posesionLenta = "El estilo recomendado es posesión lenta."
 var posesionRapida = "El estilo recomendado es posesión rápida."
 var gegenpressing = "El estilo recomendado es gegenpressing."
 var counter = "El estilo recomendado es contraataque."
 var bandas = "El estilo recomendado es ataque por las bandas."
 var catenaccio = "El estilo recomendado es catenaccio."


 var estiloEquipo = ""
 //Ahora vamos a calcular cual es el estilo de juego del equipo en string que podemos enviar en una query en la DB
 if(team.localeCompare(posesionLenta) == 0){
   estiloEquipo = "POSESION LENTA"
 }
 else if(team.localeCompare(posesionRapida) == 0){
   estiloEquipo = "POSESION RAPIDA"
 }
 else if(team.localeCompare(gegenpressing) == 0){
   estiloEquipo = "GEGENPRESSING"
 }
 else if(team.localeCompare(counter) == 0){
   estiloEquipo = "CONTRAATAQUE"
 }
 else if(team.localeCompare(bandas) == 0){
   estiloEquipo = "ATAQUE POR BANDAS"
 }
 else{
   estiloEquipo = "CATENACCIO"
 }
 //Ahora vamos a calcular el precio que ha elegido el usuario
 var valorJugador = ""
 if(value.localeCompare("do") == 0){
 valorJugador = "MUY BARATO"
 }
 else if(value.localeCompare("re") == 0){
   valorJugador = "BARATO"
 }
 else if(value.localeCompare("mi") == 0){
   valorJugador = "CARO"
 }
 else{
   valorJugador = "MUY CARO"
 }
 //Arrays para recoger a los jugadores
 let portero = []
 let central = []
 let lateralDerecho = []
 let lateralIzquierdo = []
 let mediocentro = []
 let mediapunta = []
 let extremoDerecho = []
 let extremoIzquierdo = []
 let delantero = []


//Las queries que vamos a realizar
let queryPor = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'PO' AND p.Type = '"
let queryLatIzq = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'LI' AND p.Type = '"
let queryLatDer = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'LD' AND p.Type = '"
let queryCen = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'DC' AND p.Type = '"
let queryMed = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'MC' AND p.Type = '"
let queryMep = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'MP' AND p.Type = '"
let queryExtIzq = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'EI' AND p.Type = '"
let queryExtDer = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'ED' AND p.Type = '"
let queryDel = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'DL' AND p.Type = '"

//Concatenamos el estilo del equipo y el valor del jugador
queryPor = queryPor.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
queryLatIzq = queryLatIzq.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
queryLatDer = queryLatDer.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
queryCen = queryCen.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
queryMed = queryMed.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
queryMep = queryMep.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
queryExtIzq = queryExtIzq.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
queryExtDer = queryExtDer.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
queryDel = queryDel.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1") 

//Este es el bloque de todas las llamadas a la base de datos, al final de las llamadas es donde encontraremos la logica del backend
session
.run(queryPor)
.then(function(result){
  result.records.forEach(function(record){
    portero.push(record._fields[0].properties.Nombre);portero.push(record._fields[0].properties.age.low);portero.push(record._fields[0].properties.pace.low);portero.push(record._fields[0].properties.stamina.low);portero.push(record._fields[0].properties.strength.low);portero.push(record._fields[0].properties.shooting.low);portero.push(record._fields[0].properties.passing.low);portero.push(record._fields[0].properties.dribbling.low);portero.push(record._fields[0].properties.marking.low);portero.push(record._fields[0].properties.tackling.low);portero.push(record._fields[0].properties.heading.low);portero.push(record._fields[0].properties.decisions.low);portero.push(record._fields[0].properties.positioning.low);portero.push(record._fields[0].properties.stopping.low);portero.push(record._fields[0].properties.value.low);portero.push(record._fields[0].properties.team);
  })
  session
    .run(queryLatIzq)
    .then(function(result){
    result.records.forEach(function(record){
    lateralIzquierdo.push(record._fields[0].properties.Nombre);lateralIzquierdo.push(record._fields[0].properties.age.low);lateralIzquierdo.push(record._fields[0].properties.pace.low);lateralIzquierdo.push(record._fields[0].properties.stamina.low);lateralIzquierdo.push(record._fields[0].properties.strength.low);lateralIzquierdo.push(record._fields[0].properties.shooting.low);lateralIzquierdo.push(record._fields[0].properties.passing.low);lateralIzquierdo.push(record._fields[0].properties.dribbling.low);lateralIzquierdo.push(record._fields[0].properties.marking.low);lateralIzquierdo.push(record._fields[0].properties.tackling.low);lateralIzquierdo.push(record._fields[0].properties.heading.low);lateralIzquierdo.push(record._fields[0].properties.decisions.low);lateralIzquierdo.push(record._fields[0].properties.positioning.low);lateralIzquierdo.push(record._fields[0].properties.stopping.low);lateralIzquierdo.push(record._fields[0].properties.value.low);lateralIzquierdo.push(record._fields[0].properties.team);
    })
    session
      .run(queryCen)
      .then(function(result){
      result.records.forEach(function(record){
      central.push(record._fields[0].properties.Nombre);central.push(record._fields[0].properties.age.low);central.push(record._fields[0].properties.pace.low);central.push(record._fields[0].properties.stamina.low);central.push(record._fields[0].properties.strength.low);central.push(record._fields[0].properties.shooting.low);central.push(record._fields[0].properties.passing.low);central.push(record._fields[0].properties.dribbling.low);central.push(record._fields[0].properties.marking.low);central.push(record._fields[0].properties.tackling.low);central.push(record._fields[0].properties.heading.low);central.push(record._fields[0].properties.decisions.low);central.push(record._fields[0].properties.positioning.low);central.push(record._fields[0].properties.stopping.low);central.push(record._fields[0].properties.value.low);central.push(record._fields[0].properties.team);
      })	
      session
        .run(queryLatDer)
        .then(function(result){
        result.records.forEach(function(record){
        lateralDerecho.push(record._fields[0].properties.Nombre);lateralDerecho.push(record._fields[0].properties.age.low);lateralDerecho.push(record._fields[0].properties.pace.low);lateralDerecho.push(record._fields[0].properties.stamina.low);lateralDerecho.push(record._fields[0].properties.strength.low);lateralDerecho.push(record._fields[0].properties.shooting.low);lateralDerecho.push(record._fields[0].properties.passing.low);lateralDerecho.push(record._fields[0].properties.dribbling.low);lateralDerecho.push(record._fields[0].properties.marking.low);lateralDerecho.push(record._fields[0].properties.tackling.low);lateralDerecho.push(record._fields[0].properties.heading.low);lateralDerecho.push(record._fields[0].properties.decisions.low);lateralDerecho.push(record._fields[0].properties.positioning.low);lateralDerecho.push(record._fields[0].properties.stopping.low);lateralDerecho.push(record._fields[0].properties.value.low);lateralDerecho.push(record._fields[0].properties.team);
        })
        session
          .run(queryMed)
          .then(function(result){
          result.records.forEach(function(record){
          mediocentro.push(record._fields[0].properties.Nombre);mediocentro.push(record._fields[0].properties.age.low);mediocentro.push(record._fields[0].properties.pace.low);mediocentro.push(record._fields[0].properties.stamina.low);mediocentro.push(record._fields[0].properties.strength.low);mediocentro.push(record._fields[0].properties.shooting.low);mediocentro.push(record._fields[0].properties.passing.low);mediocentro.push(record._fields[0].properties.dribbling.low);mediocentro.push(record._fields[0].properties.marking.low);mediocentro.push(record._fields[0].properties.tackling.low);mediocentro.push(record._fields[0].properties.heading.low);mediocentro.push(record._fields[0].properties.decisions.low);mediocentro.push(record._fields[0].properties.positioning.low);mediocentro.push(record._fields[0].properties.stopping.low);mediocentro.push(record._fields[0].properties.value.low);mediocentro.push(record._fields[0].properties.team);			  		
          })	
          session
            .run(queryMep)
            .then(function(result){
            result.records.forEach(function(record){
            mediapunta.push(record._fields[0].properties.Nombre);mediapunta.push(record._fields[0].properties.age.low);mediapunta.push(record._fields[0].properties.pace.low);mediapunta.push(record._fields[0].properties.stamina.low);mediapunta.push(record._fields[0].properties.strength.low);mediapunta.push(record._fields[0].properties.shooting.low);mediapunta.push(record._fields[0].properties.passing.low);mediapunta.push(record._fields[0].properties.dribbling.low);mediapunta.push(record._fields[0].properties.marking.low);mediapunta.push(record._fields[0].properties.tackling.low);mediapunta.push(record._fields[0].properties.heading.low);mediapunta.push(record._fields[0].properties.decisions.low);mediapunta.push(record._fields[0].properties.positioning.low);mediapunta.push(record._fields[0].properties.stopping.low);mediapunta.push(record._fields[0].properties.value.low);mediapunta.push(record._fields[0].properties.team);
            })	
            session
              .run(queryExtIzq)
              .then(function(result){
              result.records.forEach(function(record){
              extremoIzquierdo.push(record._fields[0].properties.Nombre);extremoIzquierdo.push(record._fields[0].properties.age.low);extremoIzquierdo.push(record._fields[0].properties.pace.low);extremoIzquierdo.push(record._fields[0].properties.stamina.low);extremoIzquierdo.push(record._fields[0].properties.strength.low);extremoIzquierdo.push(record._fields[0].properties.shooting.low);extremoIzquierdo.push(record._fields[0].properties.passing.low);extremoIzquierdo.push(record._fields[0].properties.dribbling.low);extremoIzquierdo.push(record._fields[0].properties.marking.low);extremoIzquierdo.push(record._fields[0].properties.tackling.low);extremoIzquierdo.push(record._fields[0].properties.heading.low);extremoIzquierdo.push(record._fields[0].properties.decisions.low);extremoIzquierdo.push(record._fields[0].properties.positioning.low);extremoIzquierdo.push(record._fields[0].properties.stopping.low);extremoIzquierdo.push(record._fields[0].properties.value.low);extremoIzquierdo.push(record._fields[0].properties.team);
              })	
            session
                .run(queryExtDer)
                .then(function(result){
                result.records.forEach(function(record){
                console.log(record._fields[0].properties.Nombre)
                extremoDerecho.push(record._fields[0].properties.Nombre);extremoDerecho.push(record._fields[0].properties.age.low);extremoDerecho.push(record._fields[0].properties.pace.low);extremoDerecho.push(record._fields[0].properties.stamina.low);extremoDerecho.push(record._fields[0].properties.strength.low);extremoDerecho.push(record._fields[0].properties.shooting.low);extremoDerecho.push(record._fields[0].properties.passing.low);extremoDerecho.push(record._fields[0].properties.dribbling.low);extremoDerecho.push(record._fields[0].properties.marking.low);extremoDerecho.push(record._fields[0].properties.tackling.low);extremoDerecho.push(record._fields[0].properties.heading.low);extremoDerecho.push(record._fields[0].properties.decisions.low);extremoDerecho.push(record._fields[0].properties.positioning.low);extremoDerecho.push(record._fields[0].properties.stopping.low);extremoDerecho.push(record._fields[0].properties.value.low);extremoDerecho.push(record._fields[0].properties.team);
                })
                session
                  .run(queryDel)
                  .then(function(result){
                  result.records.forEach(function(record){
                  delantero.push(record._fields[0].properties.Nombre);delantero.push(record._fields[0].properties.age.low);delantero.push(record._fields[0].properties.pace.low);delantero.push(record._fields[0].properties.stamina.low);delantero.push(record._fields[0].properties.strength.low);delantero.push(record._fields[0].properties.shooting.low);delantero.push(record._fields[0].properties.passing.low);delantero.push(record._fields[0].properties.dribbling.low);delantero.push(record._fields[0].properties.marking.low);delantero.push(record._fields[0].properties.tackling.low);delantero.push(record._fields[0].properties.heading.low);delantero.push(record._fields[0].properties.decisions.low);delantero.push(record._fields[0].properties.positioning.low);delantero.push(record._fields[0].properties.stopping.low);delantero.push(record._fields[0].properties.value.low);delantero.push(record._fields[0].properties.team);	
                  })
                  })
//Aqui vamos a incluir la logica del programa
.then(function(result){

//Booleanas que nos dicen si tenemos que enviar datos o no al frontend
var porteroMostrar = false
var lateralDerechoMostrar = false
var lateralizquierdoMostrar = false
var central1Mostrar = false
var central2Mostrar = false
var mediocentro1Mostrar = false
var mediocentro2Mostrar = false
var mediaPuntaMostrar = false
var extremoDerechoMostrar = false
var extremoIzquierdoMostrar = false
var delanteroMostrar = false

//Portero 
var posicion = req.body.z1.a
var poslen = req.body.z1.b
var posRap = req.body.z1.c
var gegen = req.body.z1.d
var count = req.body.z1.e
var ban = req.body.z1.f
var caten = req.body.z1.g

//Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
  //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
  if(poslen.localeCompare(perfect) != 0){
    porteroMostrar = true
  }
}
else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
  if(posRap.localeCompare(perfect) != 0){
    porteroMostrar = true
  }
}
else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
  if(gegen.localeCompare(perfect) != 0){
    porteroMostrar = true
  }
}
else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
  if(count.localeCompare(perfect) != 0){
    porteroMostrar = true
  }
}
else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
  if(ban.localeCompare(perfect) != 0){
    porteroMostrar = true
  }
}
else{
  if(caten.localeCompare(perfect) != 0){
    porteroMostrar = true
  }
}

//Lateral izquierdo
posicion = req.body.z2.a
poslen = req.body.z2.b
posRap = req.body.z2.c
gegen = req.body.z2.d
count = req.body.z2.e
ban = req.body.z2.f
caten = req.body.z2.g

//Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
  //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
  if(poslen.localeCompare(perfect) != 0){
    lateralizquierdoMostrar = true
  }
}
else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
  if(posRap.localeCompare(perfect) != 0){
    lateralizquierdoMostrar = true
  }
}
else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
  if(gegen.localeCompare(perfect) != 0){
    lateralizquierdoMostrar = true
  }
}
else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
  if(count.localeCompare(perfect) != 0){
    lateralizquierdoMostrar = true
  }
}
else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
  if(ban.localeCompare(perfect) != 0){
    lateralizquierdoMostrar = true
  }
}
else{
  if(caten.localeCompare(perfect) != 0){
    lateralizquierdoMostrar = true
  }
}

//Central 1
posicion = req.body.z3.a
poslen = req.body.z3.b
posRap = req.body.z3.c
gegen = req.body.z3.d
count = req.body.z3.e
ban = req.body.z3.f
caten = req.body.z3.g

//Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
  //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
  if(poslen.localeCompare(perfect) != 0){
    central1Mostrar = true
  }
}
else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
  if(posRap.localeCompare(perfect) != 0){
    central1Mostrar = true
  }
}
else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
  if(gegen.localeCompare(perfect) != 0){
    central1Mostrar = true
  }
}
else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
  if(count.localeCompare(perfect) != 0){
    central1Mostrar = true
  }
}
else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
  if(ban.localeCompare(perfect) != 0){
    central1Mostrar = true
  }
}
else{
  if(caten.localeCompare(perfect) != 0){
    central1Mostrar = true
  }
}

//Central 2
posicion = req.body.z4.a
poslen = req.body.z4.b
posRap = req.body.z4.c
gegen = req.body.z4.d
count = req.body.z4.e
ban = req.body.z4.f
caten = req.body.z4.g

//Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
  //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
  if(poslen.localeCompare(perfect) != 0){
    central2Mostrar = true
  }
}
else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
  if(posRap.localeCompare(perfect) != 0){
    central2Mostrar = true
  }
}
else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
  if(gegen.localeCompare(perfect) != 0){
    central2Mostrar = true
  }
}
else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
  if(count.localeCompare(perfect) != 0){
    central2Mostrar = true
  }
}
else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
  if(ban.localeCompare(perfect) != 0){
    central2Mostrar = true
  }
}
else{
  if(caten.localeCompare(perfect) != 0){
    central2Mostrar = true
  }
}

//Lateral derecho
posicion = req.body.z5.a
poslen = req.body.z5.b
posRap = req.body.z5.c
gegen = req.body.z5.d
count = req.body.z5.e
ban = req.body.z5.f
caten = req.body.z5.g

//Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
  //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
  if(poslen.localeCompare(perfect) != 0){
    lateralDerechoMostrar = true
  }
}
else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
  if(posRap.localeCompare(perfect) != 0){
    lateralDerechoMostrar = true
  }
}
else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
  if(gegen.localeCompare(perfect) != 0){
    lateralDerechoMostrar = true
  }
}
else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
  if(count.localeCompare(perfect) != 0){
    lateralDerechoMostrar = true
  }
}
else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
  if(ban.localeCompare(perfect) != 0){
    lateralDerechoMostrar = true
  }
}
else{
  if(caten.localeCompare(perfect) != 0){
    lateralDerechoMostrar = true
  }
}

//Mediocentro 1
posicion = req.body.z6.a
poslen = req.body.z6.b
posRap = req.body.z6.c
gegen = req.body.z6.d
count = req.body.z6.e
ban = req.body.z6.f
caten = req.body.z6.g

//Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
  //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
  if(poslen.localeCompare(perfect) != 0){
    mediocentro1Mostrar = true
  }
}
else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
  if(posRap.localeCompare(perfect) != 0){
    mediocentro1Mostrar = true
  }
}
else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
  if(gegen.localeCompare(perfect) != 0){
    mediocentro1Mostrar = true
  }
}
else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
  if(count.localeCompare(perfect) != 0){
    mediocentro1Mostrar = true
  }
}
else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
  if(ban.localeCompare(perfect) != 0){
    mediocentro1Mostrar = true
  }
}
else{
  if(caten.localeCompare(perfect) != 0){
    mediocentro1Mostrar = true
  }
}

//Mediocentro 2
posicion = req.body.z7.a
poslen = req.body.z7.b
posRap = req.body.z7.c
gegen = req.body.z7.d
count = req.body.z7.e
ban = req.body.z7.f
caten = req.body.z7.g

//Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
  //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
  if(poslen.localeCompare(perfect) != 0){
    mediocentro2Mostrar = true
  }
}
else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
  if(posRap.localeCompare(perfect) != 0){
    mediocentro2Mostrar = true
  }
}
else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
  if(gegen.localeCompare(perfect) != 0){
    mediocentro2Mostrar = true
  }
}
else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
  if(count.localeCompare(perfect) != 0){
    mediocentro2Mostrar = true
  }
}
else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
  if(ban.localeCompare(perfect) != 0){
    mediocentro2Mostrar = true
  }
}
else{
  if(caten.localeCompare(perfect) != 0){
    mediocentro2Mostrar = true
  }
}

//Mediapunta
posicion = req.body.z8.a
poslen = req.body.z8.b
posRap = req.body.z8.c
gegen = req.body.z8.d
count = req.body.z8.e
ban = req.body.z8.f
caten = req.body.z8.g

//Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
  //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
  if(poslen.localeCompare(perfect) != 0){
    mediaPuntaMostrar = true
  }
}
else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
  if(posRap.localeCompare(perfect) != 0){
    mediaPuntaMostrar = true
  }
}
else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
  if(gegen.localeCompare(perfect) != 0){
    mediaPuntaMostrar = true
  }
}
else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
  if(count.localeCompare(perfect) != 0){
    mediaPuntaMostrar = true
  }
}
else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
  if(ban.localeCompare(perfect) != 0){
    mediaPuntaMostrar = true
  }
}
else{
  if(caten.localeCompare(perfect) != 0){
    mediaPuntaMostrar = true
  }
}

//Extremo izquierdo
posicion = req.body.z9.a
poslen = req.body.z9.b
posRap = req.body.z9.c
gegen = req.body.z9.d
count = req.body.z9.e
ban = req.body.z9.f
caten = req.body.z9.g

//Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
  //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
  if(poslen.localeCompare(perfect) != 0){
    extremoIzquierdoMostrar = true
  }
}
else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
  if(posRap.localeCompare(perfect) != 0){
    extremoIzquierdoMostrar = true
  }
}
else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
  if(gegen.localeCompare(perfect) != 0){
    extremoIzquierdoMostrar = true
  }
}
else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
  if(count.localeCompare(perfect) != 0){
    extremoIzquierdoMostrar = true
  }
}
else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
  if(ban.localeCompare(perfect) != 0){
    extremoIzquierdoMostrar = true
  }
}
else{
  if(caten.localeCompare(perfect) != 0){
    extremoIzquierdoMostrar = true
  }
}

//Extremo derecho
posicion = req.body.z10.a
poslen = req.body.z10.b
posRap = req.body.z10.c
gegen = req.body.z10.d
count = req.body.z10.e
ban = req.body.z10.f
caten = req.body.z10.g

//Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
  //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
  if(poslen.localeCompare(perfect) != 0){
    extremoDerechoMostrar = true
  }
}
else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
  if(posRap.localeCompare(perfect) != 0){
    extremoDerechoMostrar = true
  }
}
else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
  if(gegen.localeCompare(perfect) != 0){
    extremoDerechoMostrar = true
  }
}
else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
  if(count.localeCompare(perfect) != 0){
    extremoDerechoMostrar = true
  }
}
else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
  if(ban.localeCompare(perfect) != 0){
    extremoDerechoMostrar = true
  }
}
else{
  if(caten.localeCompare(perfect) != 0){
    extremoDerechoMostrar = true
  }
}

//Delantero
posicion = req.body.z11.a
poslen = req.body.z11.b
posRap = req.body.z11.c
gegen = req.body.z11.d
count = req.body.z11.e
ban = req.body.z11.f
caten = req.body.z11.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
  //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
  if(poslen.localeCompare(perfect) != 0){
    delanteroMostrar = true
  }
}
else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
  if(posRap.localeCompare(perfect) != 0){
    delanteroMostrar = true
  }
}
else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
  if(gegen.localeCompare(perfect) != 0){
    delanteroMostrar = true
  }
}
else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
  if(count.localeCompare(perfect) != 0){
    delanteroMostrar = true
  }
}
else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
  if(ban.localeCompare(perfect) != 0){
    delanteroMostrar = true
  }
}
else{
  if(caten.localeCompare(perfect) != 0){
    delanteroMostrar = true
  }
}

//Ahora vamos a construir el JSON de vuelta al frontend
var arrayCeros = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
//Si los arrays están vacíos entonces tenemos que decir que no se encontró en la DB ningún dato
var porteroEmpty = false
var lateralDerechoEmpty = false
var lateralIzquierdoEmpty = false
var centralEmpty = false
var mediocentroEmpty = false
var mediapuntaEmpty = false
var extremoDerechoEmpty = false
var extremoIzquierdoEmpty = false
var delanteroEmpty = false

if(portero.length == 0){
  porteroEmpty = true
}
if(lateralDerecho.length == 0){
  lateralDerechoEmpty = true
}
if(lateralIzquierdo.length == 0){
  lateralIzquierdoEmpty = true
}
if(central.length == 0){
  centralEmpty = true
}
if(mediocentro.length == 0){
  mediocentroEmpty = true
}
if(mediapunta.length == 0){
  mediapuntaEmpty = true
}
if(extremoDerecho.length == 0){
  extremoDerechoEmpty = true
}
if(extremoIzquierdo.length == 0){
  extremoIzquierdoEmpty = true
}
if(delantero.length == 0){
  delanteroEmpty = true
}

var notFound = "No se ha encontrado ningún elemento en la base de datos que mejore el resultado."
var innecesario = "El jugador encaja con la táctica, por lo que no es necesario ofrecer ninguna recomendación."
var recomendacion = "La recomendación de jugador que encaja mejor en la táctica es la siguiente:"
var string = ""
//Ahora que ya tenemos las boleanas podemos formas la query
//Portero
//Si la booleana es true significa que el jugador es mejorable
if(porteroMostrar == true){
  //Si portero está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
  if(porteroEmpty == true){
    string = notFound
    respuesta.portero = {string, arrayCeros}
  }
  else{
    string = recomendacion
    respuesta.portero = {string, portero}
  }
}
//Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo portero
else{
  string = innecesario
  respuesta.portero = {string, arrayCeros}
}
//Lateral Izquierdo
//Si la booleana es true significa que el jugador es mejorable
if(lateralizquierdoMostrar == true){
  //Si lateral está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
  if(lateralIzquierdoEmpty == true){
    string = notFound
    respuesta.lateralIzquierdo = {string, arrayCeros}
  }
  else{
    string = recomendacion
    respuesta.lateralIzquierdo = {string, lateralIzquierdo}
  }
}
//Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo lateral
else{
  string = innecesario
  respuesta.lateralIzquierdo = {string, arrayCeros}
}
//Lateral Derecho
//Si la booleana es true significa que el jugador es mejorable
if(lateralDerechoMostrar == true){
  //Si lateral está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
  if(lateralDerechoEmpty == true){
    string = notFound
    respuesta.lateralDerecho = {string, arrayCeros}
  }
  else{
    string = recomendacion
    respuesta.lateralDerecho = {string, lateralDerecho}
  }
}
//Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo lateral
else{
  string = innecesario
  respuesta.lateralDerecho = {string, arrayCeros}
}
//Central
//Si la booleana es true significa que el jugador es mejorable (hay dos centrales así que con que uno sea mejorable ya lo añadimos)
if(central1Mostrar == true || central2Mostrar == true){
  //Si central está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
  if(centralEmpty == true){
    string = notFound
    respuesta.central = {string, arrayCeros}
  }
  else{
    string = recomendacion
    respuesta.central = {string, central}
  }
}
//Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo central
else{
  string = innecesario
  respuesta.central = {string, arrayCeros}
}
//Mediocentros
if(mediocentro1Mostrar == true || mediocentro2Mostrar == true){
  //Si mediocentro está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
  if(mediocentroEmpty == true){
    string = notFound
    respuesta.pivote = {string, arrayCeros}
  }
  else{
    string = recomendacion
    respuesta.pivote = {string, mediocentro}
  }
}
//Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo mediocentro
else{
  string = innecesario
  respuesta.pivote = {string, arrayCeros}
}
//Mediapunta

if(mediaPuntaMostrar == true){
  //Si mediapunta está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
  if(mediapuntaEmpty == true){
    string = notFound
    respuesta.mediocentro = {string, arrayCeros}
  }
  else{
    string = recomendacion
    respuesta.mediocentro = {string, mediapunta}
  }
}
//Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo mediapunta
else{
  string = innecesario
  respuesta.mediocentro = {string, arrayCeros}
}
//Extremo izquierdo
//Si la booleana es true significa que el jugador es mejorable 
if(extremoIzquierdoMostrar == true){
  //Si extremo está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
  if(extremoIzquierdoEmpty == true){
    string = notFound
    respuesta.extremoIzquierdo = {string, arrayCeros}
  }
  else{
    string = recomendacion
    respuesta.extremoIzquierdo = {string, extremoIzquierdo}
  }
}
//Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo extremo
else{
  string = innecesario
  respuesta.extremoIzquierdo = {string, arrayCeros}
}
//Extremo derecho
//Si la booleana es true significa que el jugador es mejorable 
if(extremoDerechoMostrar == true){
  //Si extremo está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
  if(extremoDerechoEmpty == true){
    string = notFound
    respuesta.extremoDerecho = {string, arrayCeros}
  }
  else{
    string = recomendacion
    respuesta.extremoDerecho = {string, extremoDerecho}
  }
}
//Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo extremo
else{
  string = innecesario
  respuesta.extremoDerecho = {string, arrayCeros}
}
//Delantero
//Si la booleana es true significa que el jugador es mejorable 
if(delanteroMostrar == true){
  //Si delantero está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
  if(delanteroEmpty == true){
    string = notFound
    respuesta.delantero = {string, arrayCeros}
  }
  else{
    string = recomendacion
    respuesta.delantero = {string, delantero}
  }
}
//Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo delantero
else{
  string = innecesario
  respuesta.delantero = {string, arrayCeros}
}
console.log(respuesta)
res.send(respuesta)

                })
                  
                })
              })
            })
          })
        })
      })
    })
    .catch(function(error){
    })

})

})

//En esta funcion recibiremos los post a la direccion de 4-2-1-3
app.post('/4213', (req, res) => {

  console.log('Se ha recibido una petición post en 4213')
  let datos = []

  //En esta parte del codigo estamos recogiendo los datos que nos envía el frontend de las preferencias de cada jugador en cada estilo de juego.
  var team = req.body.z12
  var value = req.body.z13
  
  //Aquí voy a poner las diferentes cadenas de texto que se pueden recibir tanto para individual como colectivo
  var perfect = "Encaja perfectamente en esta táctica"
  var good = "Encaja bien en esta táctica"
  var bad = "Encaja mal en esta táctica"
  var terrible = "No encaja en esta táctica"
  var posesionLenta = "El estilo recomendado es posesión lenta."
  var posesionRapida = "El estilo recomendado es posesión rápida."
  var gegenpressing = "El estilo recomendado es gegenpressing."
  var counter = "El estilo recomendado es contraataque."
  var bandas = "El estilo recomendado es ataque por las bandas."
  var catenaccio = "El estilo recomendado es catenaccio."

  var estiloEquipo = ""
  //Ahora vamos a calcular cual es el estilo de juego del equipo
  if(team.localeCompare(posesionLenta) == 0){
  	estiloEquipo = "POSESION LENTA"
  }
  else if(team.localeCompare(posesionRapida) == 0){
  	estiloEquipo = "POSESION RAPIDA"
  }
  else if(team.localeCompare(gegenpressing) == 0){
  	estiloEquipo = "GEGENPRESSING"
  }
  else if(team.localeCompare(counter) == 0){
  	estiloEquipo = "CONTRAATAQUE"
  }
  else if(team.localeCompare(bandas) == 0){
  	estiloEquipo = "ATAQUE POR BANDAS"
  }
  else{
  	estiloEquipo = "CATENACCIO"
  }

  //Ahora vamos a calcular cual es el el precio elegido por el usuario
  var valorJugador = ""
  if(value.localeCompare("do") == 0){
	valorJugador = "MUY BARATO"
  }
  else if(value.localeCompare("re") == 0){
  	valorJugador = "BARATO"
  }
  else if(value.localeCompare("mi") == 0){
  	valorJugador = "CARO"
  }
  else{
  	valorJugador = "MUY CARO"
  }

  //Arrays para recoger a los jugadores
  let portero = []
  let central = []
  let lateralDerecho = []
  let lateralIzquierdo = []
  let pivote = []
  let mediocentro = []
  let extremoDerecho = []
  let extremoIzquierdo = []
  let delantero = []

  //Las queries que vamos a realizar
  let queryPor = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'PO' AND p.Type = '"
  let queryLatIzq = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'LI' AND p.Type = '"
  let queryLatDer = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'LD' AND p.Type = '"
  let queryCen = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'DC' AND p.Type = '"
  let queryPiv = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'PI' AND p.Type = '"
  let queryMed = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'MP' AND p.Type = '"
  let queryExtIzq = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'EI' AND p.Type = '"
  let queryExtDer = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'ED' AND p.Type = '"
  let queryDel = "MATCH (v:Value)<-[:VALUED]-(n:Player)-[:PLAYS_PERFECTLY]->(p:Playstyle) WHERE n.position = 'DL' AND p.Type = '"

  //Concatenamos el estilo del equipo y el valor
  queryPor = queryPor.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryLatIzq = queryLatIzq.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryLatDer = queryLatDer.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryCen = queryCen.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryPiv = queryPiv.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryMed = queryMed.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryExtIzq = queryExtIzq.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryExtDer = queryExtDer.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1")
  queryDel = queryDel.concat(estiloEquipo + "' AND v.ValueName ='" + valorJugador + "' RETURN n limit 1") 

  //Este es el bloque de todas las llamadas a la base de datos, al final de las llamadas es donde encontraremos la lógica del backend
  session
  .run(queryPor)
  .then(function(result){
  	result.records.forEach(function(record){
  		portero.push(record._fields[0].properties.Nombre);portero.push(record._fields[0].properties.age.low);portero.push(record._fields[0].properties.pace.low);portero.push(record._fields[0].properties.stamina.low);portero.push(record._fields[0].properties.strength.low);portero.push(record._fields[0].properties.shooting.low);portero.push(record._fields[0].properties.passing.low);portero.push(record._fields[0].properties.dribbling.low);portero.push(record._fields[0].properties.marking.low);portero.push(record._fields[0].properties.tackling.low);portero.push(record._fields[0].properties.heading.low);portero.push(record._fields[0].properties.decisions.low);portero.push(record._fields[0].properties.positioning.low);portero.push(record._fields[0].properties.stopping.low);portero.push(record._fields[0].properties.value.low);portero.push(record._fields[0].properties.team);
  	})
  	session
  		.run(queryLatIzq)
  		.then(function(result){
  		result.records.forEach(function(record){
  		lateralIzquierdo.push(record._fields[0].properties.Nombre);lateralIzquierdo.push(record._fields[0].properties.age.low);lateralIzquierdo.push(record._fields[0].properties.pace.low);lateralIzquierdo.push(record._fields[0].properties.stamina.low);lateralIzquierdo.push(record._fields[0].properties.strength.low);lateralIzquierdo.push(record._fields[0].properties.shooting.low);lateralIzquierdo.push(record._fields[0].properties.passing.low);lateralIzquierdo.push(record._fields[0].properties.dribbling.low);lateralIzquierdo.push(record._fields[0].properties.marking.low);lateralIzquierdo.push(record._fields[0].properties.tackling.low);lateralIzquierdo.push(record._fields[0].properties.heading.low);lateralIzquierdo.push(record._fields[0].properties.decisions.low);lateralIzquierdo.push(record._fields[0].properties.positioning.low);lateralIzquierdo.push(record._fields[0].properties.stopping.low);lateralIzquierdo.push(record._fields[0].properties.value.low);lateralIzquierdo.push(record._fields[0].properties.team);
  		})
  		session
	  		.run(queryCen)
	  		.then(function(result){
	  		result.records.forEach(function(record){
	  		central.push(record._fields[0].properties.Nombre);central.push(record._fields[0].properties.age.low);central.push(record._fields[0].properties.pace.low);central.push(record._fields[0].properties.stamina.low);central.push(record._fields[0].properties.strength.low);central.push(record._fields[0].properties.shooting.low);central.push(record._fields[0].properties.passing.low);central.push(record._fields[0].properties.dribbling.low);central.push(record._fields[0].properties.marking.low);central.push(record._fields[0].properties.tackling.low);central.push(record._fields[0].properties.heading.low);central.push(record._fields[0].properties.decisions.low);central.push(record._fields[0].properties.positioning.low);central.push(record._fields[0].properties.stopping.low);central.push(record._fields[0].properties.value.low);central.push(record._fields[0].properties.team);
	  		})	
	  		session
		  		.run(queryLatDer)
		  		.then(function(result){
		  		result.records.forEach(function(record){
		  		lateralDerecho.push(record._fields[0].properties.Nombre);lateralDerecho.push(record._fields[0].properties.age.low);lateralDerecho.push(record._fields[0].properties.pace.low);lateralDerecho.push(record._fields[0].properties.stamina.low);lateralDerecho.push(record._fields[0].properties.strength.low);lateralDerecho.push(record._fields[0].properties.shooting.low);lateralDerecho.push(record._fields[0].properties.passing.low);lateralDerecho.push(record._fields[0].properties.dribbling.low);lateralDerecho.push(record._fields[0].properties.marking.low);lateralDerecho.push(record._fields[0].properties.tackling.low);lateralDerecho.push(record._fields[0].properties.heading.low);lateralDerecho.push(record._fields[0].properties.decisions.low);lateralDerecho.push(record._fields[0].properties.positioning.low);lateralDerecho.push(record._fields[0].properties.stopping.low);lateralDerecho.push(record._fields[0].properties.value.low);lateralDerecho.push(record._fields[0].properties.team);
		  		})
		  		session
			  		.run(queryPiv)
			  		.then(function(result){
			  		result.records.forEach(function(record){
			  		pivote.push(record._fields[0].properties.Nombre);pivote.push(record._fields[0].properties.age.low);pivote.push(record._fields[0].properties.pace.low);pivote.push(record._fields[0].properties.stamina.low);pivote.push(record._fields[0].properties.strength.low);pivote.push(record._fields[0].properties.shooting.low);pivote.push(record._fields[0].properties.passing.low);pivote.push(record._fields[0].properties.dribbling.low);pivote.push(record._fields[0].properties.marking.low);pivote.push(record._fields[0].properties.tackling.low);pivote.push(record._fields[0].properties.heading.low);pivote.push(record._fields[0].properties.decisions.low);pivote.push(record._fields[0].properties.positioning.low);pivote.push(record._fields[0].properties.stopping.low);pivote.push(record._fields[0].properties.value.low);pivote.push(record._fields[0].properties.team);			  		
			  		})	
			  		session
				  		.run(queryMed)
				  		.then(function(result){
				  		result.records.forEach(function(record){
				  		mediocentro.push(record._fields[0].properties.Nombre);mediocentro.push(record._fields[0].properties.age.low);mediocentro.push(record._fields[0].properties.pace.low);mediocentro.push(record._fields[0].properties.stamina.low);mediocentro.push(record._fields[0].properties.strength.low);mediocentro.push(record._fields[0].properties.shooting.low);mediocentro.push(record._fields[0].properties.passing.low);mediocentro.push(record._fields[0].properties.dribbling.low);mediocentro.push(record._fields[0].properties.marking.low);mediocentro.push(record._fields[0].properties.tackling.low);mediocentro.push(record._fields[0].properties.heading.low);mediocentro.push(record._fields[0].properties.decisions.low);mediocentro.push(record._fields[0].properties.positioning.low);mediocentro.push(record._fields[0].properties.stopping.low);mediocentro.push(record._fields[0].properties.value.low);mediocentro.push(record._fields[0].properties.team);
				  		})	
				  		session
					  		.run(queryExtIzq)
					  		.then(function(result){
					  		result.records.forEach(function(record){
					  		extremoIzquierdo.push(record._fields[0].properties.Nombre);extremoIzquierdo.push(record._fields[0].properties.age.low);extremoIzquierdo.push(record._fields[0].properties.pace.low);extremoIzquierdo.push(record._fields[0].properties.stamina.low);extremoIzquierdo.push(record._fields[0].properties.strength.low);extremoIzquierdo.push(record._fields[0].properties.shooting.low);extremoIzquierdo.push(record._fields[0].properties.passing.low);extremoIzquierdo.push(record._fields[0].properties.dribbling.low);extremoIzquierdo.push(record._fields[0].properties.marking.low);extremoIzquierdo.push(record._fields[0].properties.tackling.low);extremoIzquierdo.push(record._fields[0].properties.heading.low);extremoIzquierdo.push(record._fields[0].properties.decisions.low);extremoIzquierdo.push(record._fields[0].properties.positioning.low);extremoIzquierdo.push(record._fields[0].properties.stopping.low);extremoIzquierdo.push(record._fields[0].properties.value.low);extremoIzquierdo.push(record._fields[0].properties.team);
					  		})	
							session
						  		.run(queryExtDer)
						  		.then(function(result){
						  		result.records.forEach(function(record){
						  		extremoDerecho.push(record._fields[0].properties.Nombre);extremoDerecho.push(record._fields[0].properties.age.low);extremoDerecho.push(record._fields[0].properties.pace.low);extremoDerecho.push(record._fields[0].properties.stamina.low);extremoDerecho.push(record._fields[0].properties.strength.low);extremoDerecho.push(record._fields[0].properties.shooting.low);extremoDerecho.push(record._fields[0].properties.passing.low);extremoDerecho.push(record._fields[0].properties.dribbling.low);extremoDerecho.push(record._fields[0].properties.marking.low);extremoDerecho.push(record._fields[0].properties.tackling.low);extremoDerecho.push(record._fields[0].properties.heading.low);extremoDerecho.push(record._fields[0].properties.decisions.low);extremoDerecho.push(record._fields[0].properties.positioning.low);extremoDerecho.push(record._fields[0].properties.stopping.low);extremoDerecho.push(record._fields[0].properties.value.low);extremoDerecho.push(record._fields[0].properties.team);
						  		})
						  		session
							  		.run(queryDel)
							  		.then(function(result){
							  		result.records.forEach(function(record){
							  		delantero.push(record._fields[0].properties.Nombre);delantero.push(record._fields[0].properties.age.low);delantero.push(record._fields[0].properties.pace.low);delantero.push(record._fields[0].properties.stamina.low);delantero.push(record._fields[0].properties.strength.low);delantero.push(record._fields[0].properties.shooting.low);delantero.push(record._fields[0].properties.passing.low);delantero.push(record._fields[0].properties.dribbling.low);delantero.push(record._fields[0].properties.marking.low);delantero.push(record._fields[0].properties.tackling.low);delantero.push(record._fields[0].properties.heading.low);delantero.push(record._fields[0].properties.decisions.low);delantero.push(record._fields[0].properties.positioning.low);delantero.push(record._fields[0].properties.stopping.low);delantero.push(record._fields[0].properties.value.low);delantero.push(record._fields[0].properties.team);	
							  		})
							  		})
//Aquí vamos a incluir la lógica del programa
.then(function(result){

  //Booleanas que nos dicen si tenemos que enviar datos o no al frontend
  var porteroMostrar = false
  var lateralDerechoMostrar = false
  var lateralizquierdoMostrar = false
  var central1Mostrar = false
  var central2Mostrar = false
  var pivoteMostrar = false
  var mediocentro1Mostrar = false
  var mediocentro2Mostrar = false
  var extremoDerechoMostrar = false
  var extremoIzquierdoMostrar = false
  var delanteroMostrar = false

	//Portero
	var posicion = req.body.z1.a
  var poslen = req.body.z1.b
  var posRap = req.body.z1.c
  var gegen = req.body.z1.d
  var count = req.body.z1.e
  var ban = req.body.z1.f
	var caten = req.body.z1.g

//Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
  	//Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
  	if(poslen.localeCompare(perfect) != 0){
      porteroMostrar = true
  	}
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
  	if(posRap.localeCompare(perfect) != 0){
      porteroMostrar = true
  	}
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
  	if(gegen.localeCompare(perfect) != 0){
      porteroMostrar = true
  	}
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
  	if(count.localeCompare(perfect) != 0){
      porteroMostrar = true
  	}
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
  	if(ban.localeCompare(perfect) != 0){
      porteroMostrar = true
  	}
  }
  else{
  	if(caten.localeCompare(perfect) != 0){
      porteroMostrar = true
  	}
  }

  //Lateral izquierdo
	posicion = req.body.z2.a
  poslen = req.body.z2.b
  posRap = req.body.z2.c
  gegen = req.body.z2.d
  count = req.body.z2.e
  ban = req.body.z2.f
	caten = req.body.z2.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      lateralizquierdoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      lateralizquierdoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      lateralizquierdoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      lateralizquierdoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      lateralizquierdoMostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      lateralizquierdoMostrar = true
    }
  }

  //Central 1
	posicion = req.body.z3.a
  poslen = req.body.z3.b
  posRap = req.body.z3.c
  gegen = req.body.z3.d
  count = req.body.z3.e
  ban = req.body.z3.f
	caten = req.body.z3.g

	//Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      central1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      central1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      central1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      central1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      central1Mostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      central1Mostrar = true
    }
  }

  //Central 2
	posicion = req.body.z4.a
  poslen = req.body.z4.b
  posRap = req.body.z4.c
  gegen = req.body.z4.d
  count = req.body.z4.e
  ban = req.body.z4.f
	caten = req.body.z4.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      central2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      central2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      central2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      central2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      central2Mostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      central2Mostrar = true
    }
  }

  //Lateral derecho
	posicion = req.body.z5.a
  poslen = req.body.z5.b
  posRap = req.body.z5.c
  gegen = req.body.z5.d
  count = req.body.z5.e
  ban = req.body.z5.f
	caten = req.body.z5.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      lateralDerechoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      lateralDerechoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      lateralDerechoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      lateralDerechoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      lateralDerechoMostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      lateralDerechoMostrar = true
    }
  }

  //Pivote 1
	posicion = req.body.z6.a
  poslen = req.body.z6.b
  posRap = req.body.z6.c
  gegen = req.body.z6.d
  count = req.body.z6.e
  ban = req.body.z6.f
	caten = req.body.z6.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      pivoteMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      pivoteMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      pivoteMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      pivoteMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      pivoteMostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      pivoteMostrar = true
    }
  }

  //Pivote 2
	posicion = req.body.z7.a
  poslen = req.body.z7.b
  posRap = req.body.z7.c
  gegen = req.body.z7.d
  count = req.body.z7.e
  ban = req.body.z7.f
	caten = req.body.z7.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      mediocentro1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      mediocentro1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      mediocentro1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      mediocentro1Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      mediocentro1Mostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      mediocentro1Mostrar = true
    }
  }

  //Mediapunta
	posicion = req.body.z8.a
  poslen = req.body.z8.b
  posRap = req.body.z8.c
  gegen = req.body.z8.d
  count = req.body.z8.e
  ban = req.body.z8.f
	caten = req.body.z8.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      mediocentro2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      mediocentro2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      mediocentro2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      mediocentro2Mostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      mediocentro2Mostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      mediocentro2Mostrar = true
    }
  }

  //Extremo izquierdo
	posicion = req.body.z9.a
  poslen = req.body.z9.b
  posRap = req.body.z9.c
  gegen = req.body.z9.d
  count = req.body.z9.e
  ban = req.body.z9.f
	caten = req.body.z9.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      extremoIzquierdoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      extremoIzquierdoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      extremoIzquierdoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      extremoIzquierdoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      extremoIzquierdoMostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      extremoIzquierdoMostrar = true
    }
  }

  //Extremo derecho
	posicion = req.body.z10.a
  poslen = req.body.z10.b
  posRap = req.body.z10.c
  gegen = req.body.z10.d
  count = req.body.z10.e
  ban = req.body.z10.f
	caten = req.body.z10.g

  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      extremoDerechoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      extremoDerechoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      extremoDerechoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      extremoDerechoMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      extremoDerechoMostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      extremoDerechoMostrar = true
    }
  }

  //Delantero
	posicion = req.body.z11.a
  poslen = req.body.z11.b
  posRap = req.body.z11.c
  gegen = req.body.z11.d
  count = req.body.z11.e
  ban = req.body.z11.f
	caten = req.body.z11.g

	  //Ahora en función del estilo del juego del equipo hallaremos si es necesario llamar a la base de datos o no
  if(estiloEquipo.localeCompare("POSESION LENTA") == 0){
    //Cogemos el valor del jugador de comparación y comprobamos si es perfecto o no
    if(poslen.localeCompare(perfect) != 0){
      delanteroMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("POSESION RAPIDA") == 0){
    if(posRap.localeCompare(perfect) != 0){
      delanteroMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("GEGENPRESSING") == 0){
    if(gegen.localeCompare(perfect) != 0){
      delanteroMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("CONTRAATAQUE") == 0){
    if(count.localeCompare(perfect) != 0){
      delanteroMostrar = true
    }
  }
  else if(estiloEquipo.localeCompare("ATAQUE POR BANDAS") == 0){
    if(ban.localeCompare(perfect) != 0){
      delanteroMostrar = true
    }
  }
  else{
    if(caten.localeCompare(perfect) != 0){
      delanteroMostrar = true
    }
  }

	//Ahora vamos a construir el JSON de vuelta al frontend
	var arrayCeros = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	//Si los arrays están vacios entonces tenemos que decir que no se encontró en la DB ningun dato
	var porteroEmpty = false
	var lateralDerechoEmpty = false
	var lateralIzquierdoEmpty = false
	var centralEmpty = false
	var pivoteEmpty = false
	var mediocentroEmpty = false
	var extremoDerechoEmpty = false
	var extremoIzquierdoEmpty = false
	var delanteroEmpty = false

	if(portero.length == 0){
		porteroEmpty = true
	}
	if(lateralDerecho.length == 0){
		lateralDerechoEmpty = true
	}
	if(lateralIzquierdo.length == 0){
		lateralIzquierdoEmpty = true
	}
	if(central.length == 0){
		centralEmpty = true
	}
	if(pivote.length == 0){
		pivoteEmpty = true
	}
	if(mediocentro.length == 0){
		mediocentroEmpty = true
	}
	if(extremoDerecho.length == 0){
		extremoDerechoEmpty = true
	}
	if(extremoIzquierdo.length == 0){
		extremoIzquierdoEmpty = true
	}
	if(delantero.length == 0){
		delanteroEmpty = true
	}

	var notFound = "No se ha encontrado ningún elemento en la base de datos que mejore el resultado."
	var innecesario = "El jugador encaja con la táctica, por lo que no es necesario ofrecer ninguna recomendación."
	var recomendacion = "La recomendación de jugador que encaja mejor en la táctica es la siguiente:"
	var string = ""
	//Ahora que ya tenemos las boleanas podemos formas la query
	//Portero
	//Si la booleana es true significa que el jugador es mejorable
	if(porteroMostrar == true){
		//Si portero está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
		if(porteroEmpty == true){
			string = notFound
			respuesta.portero = {string, arrayCeros}
		}
		else{
			string = recomendacion
			respuesta.portero = {string, portero}
		}
	}
	//Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo portero
	else{
		string = innecesario
		respuesta.portero = {string, arrayCeros}
	}
	//Lateral Izquierdo
	//Si la booleana es true significa que el jugador es mejorable
	if(lateralizquierdoMostrar == true){
		//Si lateral está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
		if(lateralIzquierdoEmpty == true){
			string = notFound
			respuesta.lateralIzquierdo = {string, arrayCeros}
		}
		else{
			string = recomendacion
			respuesta.lateralIzquierdo = {string, lateralIzquierdo}
		}
	}
	//Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo lateral
	else{
		string = innecesario
		respuesta.lateralIzquierdo = {string, arrayCeros}
	}
	//Lateral Derecho
	//Si la booleana es true significa que el jugador es mejorable
	if(lateralDerechoMostrar == true){
		//Si lateral está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
		if(lateralDerechoEmpty == true){
			string = notFound
			respuesta.lateralDerecho = {string, arrayCeros}
		}
		else{
			string = recomendacion
			respuesta.lateralDerecho = {string, lateralDerecho}
		}
	}
	//Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo lateral
	else{
		string = innecesario
		respuesta.lateralDerecho = {string, arrayCeros}
	}
	//Central
	//Si la booleana es true significa que el jugador es mejorable (hay dos centrales así que con que uno sea mejorable ya lo añadimos)
	if(central1Mostrar == true || central2Mostrar == true){
		//Si central está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
		if(centralEmpty == true){
			string = notFound
			respuesta.central = {string, arrayCeros}
		}
		else{
			string = recomendacion
			respuesta.central = {string, central}
		}
	}
	//Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo central
	else{
		string = innecesario
		respuesta.central = {string, arrayCeros}
	}
	//Pivotes
  //mediocentro 1 es el segundo pivote
	if(pivoteMostrar == true || mediocentro1Mostrar == true){
		//Si pivote está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
		if(pivoteEmpty == true){
			string = notFound
			respuesta.pivote = {string, arrayCeros}
		}
		else{
			string = recomendacion
			respuesta.pivote = {string, pivote}
		}
	}
	//Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo pivote
	else{
		string = innecesario
		respuesta.pivote = {string, arrayCeros}
	}

	//Mediapunta
  if(mediocentro2Mostrar == true){
    //mediocentro2 es el mediapunta
		//Si mediocentro está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
		if(mediocentroEmpty == true){
			string = notFound
			respuesta.mediocentro = {string, arrayCeros}
		}
		else{
			string = recomendacion
			respuesta.mediocentro = {string, mediocentro}
		}
	}
	//Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo mediocentro
	else{
		string = innecesario
		respuesta.mediocentro = {string, arrayCeros}
	}
	//Extremo izquierdo
	//Si la booleana es true significa que el jugador es mejorable 
	if(extremoIzquierdoMostrar == true){
		//Si extremo está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
		if(extremoIzquierdoEmpty == true){
			string = notFound
			respuesta.extremoIzquierdo = {string, arrayCeros}
		}
		else{
			string = recomendacion
			respuesta.extremoIzquierdo = {string, extremoIzquierdo}
		}
	}
	//Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo extremo
	else{
		string = innecesario
		respuesta.extremoIzquierdo = {string, arrayCeros}
	}
	//Extremo derecho
	//Si la booleana es true significa que el jugador es mejorable 
	if(extremoDerechoMostrar == true){
		//Si extremo está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
		if(extremoDerechoEmpty == true){
			string = notFound
			respuesta.extremoDerecho = {string, arrayCeros}
		}
		else{
			string = recomendacion
			respuesta.extremoDerecho = {string, extremoDerecho}
		}
	}
	//Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo extremo
	else{
		string = innecesario
		respuesta.extremoDerecho = {string, arrayCeros}
	}
	//Delantero
	//Si la booleana es true significa que el jugador es mejorable 
	if(delanteroMostrar == true){
		//Si delantero está empty, entonces no podemos enviar a ningún jugador, por lo que enviamos el array de ceros
		if(delanteroEmpty == true){
			string = notFound
			respuesta.delantero = {string, arrayCeros}
		}
		else{
			string = recomendacion
			respuesta.delantero = {string, delantero}
		}
	}
	//Si no hay que mostrarlo podemos enviar 0s ya que no es necesario enviar el nuevo delantero
	else{
		string = innecesario
		respuesta.delantero = {string, arrayCeros}
	}
	console.log(respuesta)
	res.send(respuesta)

									})
							  		
						  		})
					  		})
			  			})
		  			})
		  		})
	  		})
  		})
  		.catch(function(error){
  		})

	})
    
})

app.post('/442', (req, res) => {
  console.log('Se ha recibido una petición post en 442')
})

app.post('/451', (req, res) => {
  console.log('Se ha recibido una petición post en 451')
})

app.post('/523', (req, res) => {
  console.log('Se ha recibido una petición post en 523')
})

app.post('/532', (req, res) => {
  console.log('Se ha recibido una petición post en 532')
})

app.listen(3000, () => {
  console.log(`La aplicacion de Business Intelligence funciona correctamente.`)
})