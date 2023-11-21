const express = require("express") // Importamos express
const conexion = require("../conexion") // Importamos conexion (la bd)

const routerHoteles = express.Router() // declaramos la ruta routerRestaurants. En app dijimos que es /api/hoteles

// Solicitud GET en la dirección /table-hotel (Queda como http://localhost:3202/api/hoteles/table-hotel)
routerHoteles.get("/table-hotel", (req, res) => {

  // Le pedimos a la db que obtenga todos los registros de la tabla hoteles
  conexion.query("SELECT * FROM hoteles", (err, result) => {

    // Si hay un error......
    if (err) {
      console.error(err); // Lo muestra en consola
      res.status(500).json({ error: "Error al obtener datos de hoteles" }); // Status 500 (server error)
    } 
    
    // Si no hay errores......
    else {
      res.status(200).json(result); // Devuelve los datos de hoteles en formato JSON con status 200 (envio exitoso)
    }
  });
});



// Solicitud POST en la direccion /create-hotel (Queda como http://localhost:3202/api/hoteles/create-table)
routerHoteles.post("/create-hotel", (req, res) => { 
  const nombre_hotel= req.body.nombre_hotel; // Guardamos en la constante "nombre_hotel" el valor recibido desde el frontend
  const descripcion_hotel = req.body.descripcion_hotel; // Idem "descripcion_hotel"
  const direccion_hotel = req.body.direccion_hotel; // Idem "direccion_hotel"
  const url_hotel = req.body.url_hotel; // Idem "url_hotel"
  const telefono_hotel = req.body.telefono_hotel; // Idem "telefono_hotel"

  // Le pedimos a la bd insertar los valores declarados anteriormente a la tabla hoteles
  conexion.query("INSERT INTO hoteles (nombre_hotel, descripcion_hotel, direccion_hotel, url_hotel, telefono_hotel) VALUES (?, ?, ?, ?,?)", [nombre_hotel, descripcion_hotel, direccion_hotel, url_hotel,telefono_hotel], (err, result) => {
      
    // Si no hay errores...
    if(result) {
          res.send(result); // Insertamos los datos en la tabla
      }
      
      // Si hay errores....
      else{
          res.send({message: "Ingresa los registros faltantes!"}) // Mostramos en el servidor un mensaje de error
      }
  })
})



// Solicitud PUT en la direccion /modify-hotel (Queda como http://localhost:3202/api/hoteles/modify-hotel)
routerHoteles.put("/modify-hotel", (req, res) => {
  const id = req.body.id; // Guardamos en una constante "id" el valor recibido desde el frontend
  const nombre_hotel= req.body.nombre_hotel; // Idem "nombre_hotel"
  const descripcion_hotel = req.body.descripcion_hotel; // Idem "descripcion_hotel"
  const direccion_hotel = req.body.direccion_hotel; // Idem "direccion_hotel"
  const url_hotel = req.body.url_hotel; // Idem "url_hotel"
  const telefono_hotel = req.body.telefono_hotel; // Idem "telefono_hotel"

  // Le pedimos a la bd que actualize los datos antiguos por los nuevos datos que ingreso el usuario
  conexion.query("UPDATE hoteles SET nombre_hotel=?, descripcion_hotel=?, direccion_hotel=?, url_hotel=?, telefono_hotel=? WHERE id=?", [nombre_hotel, descripcion_hotel, direccion_hotel, url_hotel, telefono_hotel,id], (err, result) => {
    
    // Si la solicitud se realiza con exito....
    if(result) {
      res.send("Hotel actualizado con exito"); // Se muestra un mensaje de exito en el servidor
    }
    
    // Si la solicitud no se realiza con exito.....
    else{
      res.send({message: "Ingresa los registros faltantes!", err}) // Muestra en el servidor un mensaje de error
  }
  })
})



// Solicitud DELETE en la direccion /delete-hotel/:id (Queda como http://localhost:3202/api/hoteles/delete-hotel/:id)
routerHoteles.delete("/delete-hotel/:id", (req, res) => {

  const id = req.params.id; // Obtenemos el parametro id desde el frontend y lo declaramos en una constante "id"

  // Le pedimos a la bd que elimine los registros del id seleccionado en la tabla hoteles
  conexion.query("DELETE FROM hoteles WHERE id=?", id, (err, result) => {

    // Si hay errores...
    if(err) {
      console.log(err) // Muestra el error en la consola
    } 

    // Si no hay errores....
    else {
      res.send(result) // Elimina los registros de la tabla hoteles
    }
  })
})

module.exports = routerHoteles; // Permite que podamos usar routerHoteles en los demas archivos.