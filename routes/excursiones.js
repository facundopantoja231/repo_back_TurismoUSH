const express = require("express") // Importamos express
const conexion = require("../conexion") // Importamos conexion (la bd)

const routerExcursiones = express.Router() // declaramos la ruta routerRestaurants. En app dijimos que es /api/excursiones

// Solicitud GET en la direccion /:excursionId (Queda como http://localhost:3202/api/excursiones/:excursionID)
routerExcursiones.get("/:excursionId", (req, res) => {
  // Recordemos que :excursionId es un parametro

  const excursionId = req.params.excursionId; // Obtenemos el parametro desde el front y lo guardamos en la constante "excursionId"

  // Le pedimos a la bd que traiga todos los datos del id que se recibio desde el front
  conexion.query("SELECT * FROM excursiones WHERE id = ?", [excursionId], (err, result) => {

    // Si hubo un error en LA SOLICITUD SQL.......
    if (err) {
      console.error(err); // Muestra el error en la consola
      res.status(500).json({ error: `Error al obtener detalles de la excursión ${excursionId}` }); // Status 500 (server error)
    } 
    
    // Si no hubo un error en la SOLICITUD SQL.......
    else { 

      // Si el id que ingreso el usuario no existe......
      if (result.length === 0) {
        res.status(404).json({ error: "Excursión no encontrada" }); // Status 404 (client error) significa que el id no existe
      } 
      
      // Si el id que ingreso el usuario existe....
      else {
        res.status(200).json(result[0]); // Envia los datos en formato JSON con status 200 (envio exitoso)
      }
    }
  });
});



// Solicitud GET en la direccion / (Queda como http://localhost:3202/api/excursiones/)
routerExcursiones.get("/", (req, res) => {
  
  // Le pedimos a la bd que traiga todos los registros de la tabla excursiones
  conexion.query("SELECT * FROM excursiones", (err, result) => {

    // Si hay errores.....
    if (err) {
      console.error(err); // Muestra el error en consola
      res.status(500).json({ error: "Error al obtener datos de excursiones" }); // Status 500 (server error)
    } 
    
    // Si no hubo errores...
    else {
      res.status(200).json(result); // Devuelve los datos de excursiones en formato JSON con status 200 (envio exitoso)
    }
  });
});



// Solicitud POST en la direccion /create-exc (Queda como http://localhost:3202/api/excursiones/create-exc)
routerExcursiones.post("/create-exc", (req, res) => { 
  const excursion = req.body.excursion; // Guardamos el valor excursion obtenido del front en una constante "excursion"
  const descripcion_exc = req.body.descripcion_exc; // Idem "descripcion_exc"
  const precio = req.body.precio; // Idem "precio"
  const urlImagen_exc = req.body.urlImagen_exc; // Idem "urlImagen_exc"
  const cupos = req.body.cupos; // Idem "cupos"
  const horarios = req.body.horarios; // Idem "horarios"
  const duracion = req.body.duracion; // Idem "duracion"
  const dificultad = req.body.dificultad; // Idem "dificultad"
  const idioma = req.body.idioma; // Idem "idioma"
  const traslados = req.body.traslados; // Idem "traslados"
  const disponible = req.body.disponible; // Idem "disponible"
  const ambiente = req.body.ambiente; // Idem "ambiente"
  const forma_de_pago = req.body.forma_de_pago; // Idem "forma_de_pago"
  const minimo_de_participantes = req.body.minimo_de_participantes; // Idem "minimo_de_participantes"
  const fecha = req.body.fecha // Idem "fecha"

  // Le pedimos a la bd insertar todos los datos obtenidos del front a la tabla excursiones
  conexion.query("INSERT INTO excursiones (excursion, descripcion_exc, precio, urlImagen_exc, cupos, horarios, duracion, dificultad, idioma, traslados, disponible, ambiente, forma_de_pago, minimo_de_participantes, fecha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [excursion, descripcion_exc, precio, urlImagen_exc, cupos, horarios, duracion, dificultad, idioma, traslados, disponible, ambiente, forma_de_pago, minimo_de_participantes, fecha], (err, result) => {
      
    // Si hay errores....
    if(err) {
      console.log(err); // Muestra el error en consola
    } 
    
    // Si no hay errores...
    else {
      res.send(result); // Envia los datos a la bd
    }
  })
})



// Solicitud PUT en la direccion /modify-exc (Queda como htto://localhost:3202/api/excursiones/modify-exc)
routerExcursiones.put("/modify-exc", (req, res) => {
  const id = req.body.id; // Guardamos el valor id obtenido del front en una constante "id"
  const excursion = req.body.excursion; // Idem "excursion"
  const descripcion_exc = req.body.descripcion_exc; // Idem "descripcion_exc"
  const precio = req.body.precio; // Idem "precio"
  const urlImagen_exc = req.body.urlImagen_exc; // Idem "urlImagen_exc"
  const cupos = req.body.cupos; // Idem "cupos"
  const horarios = req.body.horarios; // Idem "horarios"
  const duracion = req.body.duracion; // Idem "duracion"
  const dificultad = req.body.dificultad; // Idem "dificultad"
  const idioma = req.body.idioma; // Idem "idioma"
  const traslados = req.body.traslados; // Idem "traslados"
  const disponible = req.body.disponible; // Idem "disponible"
  const ambiente = req.body.ambiente; // Idem "ambiente"
  const forma_de_pago = req.body.forma_de_pago; // Idem "forma_de_pago"
  const minimo_de_participantes = req.body.minimo_de_participantes; // Idem "minimo_de_participantes"
  const fecha = req.body.fecha; // Idem "minimo_de_participantes"
    
  // Le pedimos a la bd que actualice los datos antiguos de la tabla excursiones por los nuevos ingresados por el usuario
  conexion.query("UPDATE excursiones SET excursion=?, descripcion_exc=?, precio=?, urlImagen_exc=?, cupos=?, horarios=?, duracion=?, dificultad=?, idioma=?, traslados=?, disponible=?, ambiente=?, forma_de_pago=?, minimo_de_participantes=?, fecha=? WHERE id=?", [excursion, descripcion_exc, precio, urlImagen_exc, cupos, horarios, duracion, dificultad, idioma, traslados, disponible, ambiente, forma_de_pago, minimo_de_participantes, fecha, id], (err, result) => {
    
    // Si la solicitud SQL se hizo con exito.....
    if(result) {
      res.send("Excursion actualizado con exito"); // Se actualizan los datos y muestra este mensaje en el server
    }
    
    // Si la solicitud SQL no se hizo con exito.....
    else {
      res.send({message: "Ingresa los registros faltantes!", err}) // Mostramos en el servidor cual fue el error
    }
  })
})



// Solicitud DELETE en la direccion /delete-exc/:id (Queda como http://localhost:3202/api/excursiones/delete-exc/:id)
routerExcursiones.delete("/delete-exc/:id", (req, res) => {
// Recordemos que :id es un parametro obtenido desde el front
  const id = req.params.id; // Guardamos el parametro id obtenido del frontend en una constante "id"
  
  // Le pedimos a la bd que elimine los datos de la excursiones tomando como referencia el id
  conexion.query("DELETE FROM excursiones WHERE id=?", id, (err, result) => {
    
    // Si hay errores....
    if(err) {
      console.log(err) // Los muestra en consola
    } 
    
    // Si no hay errores....
    else {
      res.send(result) // Eliminamos el registro de la tabla excursiones
    }
  })
})

module.exports = routerExcursiones; // Permite que podamos usar routerExcursiones en los demas archivos.