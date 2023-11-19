// importacion de express y de conexión.js (la base de datos de turismo ushuaia)

const express = require("express")
const conexion = require("../conexion")

// importacion del router Usuarios

const routerRestaurants = express.Router()




// Esta es la logica que permite obtener datos por ID de la tabla restaurantes
// Metodo GET en la direccion /:id (:id es el parametro que creamos y le asignamos el id obtenido del cliente)
routerRestaurants.get('/:id', (req, res) => {
    const id = req.params.id;
  
    // Realizar una consulta SQL para recuperar registros por ID
    const sql = 'SELECT * FROM restaurantes WHERE id = ?'; // Reemplaza "tu_tabla" con el nombre de tu tabla.
    
    conexion.query(sql, [id], (err, results) => {
      if (err) {
        console.error('Error al obtener datos por ID:', err);
        res.status(500).json({ error: 'Error al obtener datos por ID' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: 'No se encontraron registros con el ID proporcionado' });
        } else {
          res.status(200).json(results);
        }
      }
    });
  });

// Esta es la logica que permite obtener todos los datos de la tabla restaurantes
// Metodo GET en la dirección /table-res
routerRestaurants.get("/table-res", (req, res) => {
  
    conexion.query("SELECT * FROM restaurantes", (err, result) => {
      if (err) {
        console.error("Error al obtener datos de restaurantes:", err);
        res.status(500).json({ error: "Error al obtener datos de restaurantes" });
      } else {
        res.status(200).json(result); // Devuelve los datos de restaurantes en formato JSON
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
    const id = req.body.id;
    const restaurante_nombre = req.body.restaurante_nombre;
    const descripcion = req.body.descripcion;
    const direccion = req.body.direccion;
    const urlImagen = req.body.urlImagen;

    conexion.query("UPDATE restaurantes SET restaurante_nombre=?, descripcion=?, direccion=?, urlImagen=? WHERE id=?", [restaurante_nombre,descripcion,direccion,urlImagen,id], (err, result) => {
      if(result) {
        res.send("Restaurante actualizado con exito");
      }else{
        res.send({message: "Ingresa los registros faltantes!", err})
    }
    })
  })

// Esta es la logica que permite eliminar registros de la base de datos
// Metodo DELETE en direccion /delete-res
routerRestaurants.delete("/delete-res/:id", (req, res) => {

  const id = req.params.id;

  conexion.query("DELETE FROM restaurantes WHERE id=?", id, (err, result) => {
    if(err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})




// exportamos routersRestaurants para mostrarlo y ejecutarlo desde app.js

module.exports = routerRestaurants;

