const express = require("express") // Importamos express
const conexion = require("../conexion") // Importamos conexion (la bd)

const routerRestaurants = express.Router() // declaramos la ruta routerRestaurants. En app dijimos que es /api/restaurants



// Esta es la logica que permite obtener datos por ID de la tabla restaurantes
// Metodo GET en la direccion /:id (:id es el parametro que creamos y le asignamos el id obtenido del cliente)
routerRestaurants.get('/:id', (req, res) => {
  const id = req.params.id;

  // Realizamos una consulta SQL para obtener los registros por ID
  const sql = 'SELECT * FROM restaurantes WHERE id = ?'; 
  
  // Le pedimos a la bd que nos traiga los registros si el id coincide con el que nos pidio el usuario
  conexion.query(sql, [id], (err, results) => {

    // Si hay errores.......
    if (err) {
      console.error(err); // Mostramos el error en consola 
      res.status(500).json({ error: 'Error al obtener datos por ID' }); // Status 500 (server error)
    }

    // Si el id que pidieron, no existe en la base de datos.......
    if (results.length === 0) {
      res.status(404).json({ message: 'No se encontraron registros con el ID proporcionado' }); // Status 404 (client error)
    } 
    
    // Caso contrario, osea si el id existe en la bd......
    else {
      res.status(200).json(results); // Enviamos los datos en formato JSON al frontend con status 200 (envio exitoso)
    }
  });
});



// Esta es la logica que permite obtener todos los datos de la tabla restaurantes
// Metodo GET en la dirección / de routerRestaurants (/api/restaurants/)
routerRestaurants.get("/", (req, res) => {
  
  // Le pedimos a la base de datos obtener todos los registros de la tabla restaurantes
  conexion.query("SELECT * FROM restaurantes", (err, result) => {

    // Si hay errores......
    if (err) {
      console.error(err); // Muestra el error en consola
      res.status(500).json({ error: "Error al obtener datos de restaurantes" }); // Status 500 (server error)
    } 

    // Si no hay errores....... 
    else {
      res.status(200).json(result); // Enviamos los datos en formato JSON con status 200 (envio exitoso)
    }
  });
});



// Esta es la logica que permite insertar datos de restaurantes dentro de la tabla restaurantes
// Metodo POST en la dirección /create-res
routerRestaurants.post("/create-res", (req, res) => { 

  // Asignamos constantes para los valores recibidos del lado del cliente

    const restaurante_nombre = req.body.restaurante_nombre;
    const descripcion = req.body.descripcion;
    const direccion = req.body.direccion;
    const urlImagen = req.body.urlImagen;

  // Petición a la base de datos de inserción de datos

    conexion.query("INSERT INTO restaurantes (restaurante_nombre, descripcion, direccion, urlImagen) VALUES (?, ?, ?, ?)", [restaurante_nombre, descripcion, direccion, urlImagen], (err, result) => {
   
  // Si no hay errores, simplemente se envian a la DB
  
      if(result) {
            res.send(result);
        }else{

    // Caso contrario, se muestra un objeto q indica un mensaje de error seguido del error en concreto
            res.send({message: "Ingresa los registros faltantes!", err})
        }
    })


})



// Esta es la logica que permite modificar los registros en la interfaz de administración
// Metodo PUT en la dirección /modify-res
routerRestaurants.put("/modify-res", (req, res) => {
  const id = req.body.id; // Creamos una constante "id" que contiene el valor que recibimos desde el frontend
  const restaurante_nombre = req.body.restaurante_nombre; // Idem "restaurante_nombre"
  const descripcion = req.body.descripcion; // Idem "descripcion"
  const direccion = req.body.direccion; // Idem "direccion"
  const urlImagen = req.body.urlImagen; // Idem "urlImagen"

  // Le pedimos a la bd que actualize los registros por los campos que ingreso el usuario, tomando como referencia el ID
  conexion.query("UPDATE restaurantes SET restaurante_nombre=?, descripcion=?, direccion=?, urlImagen=? WHERE id=?", [restaurante_nombre,descripcion,direccion,urlImagen,id], (err, result) => {
    
    // Si se actualizan los cambios........
    if(result) {
      res.send("Restaurante actualizado con exito"); // Mostramos en el servidor este mensaje
    }
    
    // Si no se actualizan los cambios....
    else{
      console.log(err) // Mostramos el error que hubo en la consola
  }
  })
})



// Esta es la logica que permite eliminar registros de la base de datos
// Metodo DELETE en direccion /delete-res
routerRestaurants.delete("/delete-res/:id", (req, res) => {

  const id = req.params.id; // Obtenemos el id como parametro desde el frontend

  // Le pedimos a la bd que elimina el registro de la table restaurante si el id coincide con el que ingreso el usuario
  conexion.query("DELETE FROM restaurantes WHERE id=?", id, (err, result) => {
    
    // Si el id no coincide o no existe....
    if(err) {
      console.log(err) // Muestra en consola el error que hubo
    } 
    
    // Si el id coincide....
    else {
      res.send(result) // Se realiza la solicitud y se elimina de la bd
    }
  })
})

module.exports = routerRestaurants; // Permite que podamos usar routerRestaurants en los demas archivos.