// importacion de express y de conexión.js (la base de datos de turismo ushuaia)

const express = require("express")
const conexion = require("../conexion")

// importacion del router hoteles

const routerHoteles = express.Router()

routerHoteles.get("/table-hotel", (req, res) => {
  
    conexion.query("SELECT * FROM hoteles", (err, result) => {
      if (err) {
        console.error("Error al obtener datos de hoteles:", err);
        res.status(500).json({ error: "Error al obtener datos de hoteles" });
      } else {
        res.status(200).json(result); // Devuelve los datos de hoteles en formato JSON
      }
    });
  });

routerHoteles.post("/create-hotel", (req, res) => { 

    const nombre_hotel= req.body.nombre_hotel;
    const descripcion_hotel = req.body.descripcion_hotel;
    const direccion_hotel = req.body.direccion_hotel;
    const url_hotel = req.body.url_hotel;
    const telefono_hotel = req.body.telefono_hotel;

    conexion.query("INSERT INTO hoteles (nombre_hotel, descripcion_hotel, direccion_hotel, url_hotel, telefono_hotel) VALUES (?, ?, ?, ?,?)", [nombre_hotel, descripcion_hotel, direccion_hotel, url_hotel,telefono_hotel], (err, result) => {
        if(result) {
            res.send(result);
        }else{
            res.send({message: "Ingresa los registros faltantes!"})
        }
    })


})





// Esta es la logica que permite modificar los registros en la interfaz de administración
// Metodo PUT en la dirección /modify-res
routerHoteles.put("/modify-hotel", (req, res) => {
  const id = req.body.id;
  const nombre_hotel= req.body.nombre_hotel;
  const descripcion_hotel = req.body.descripcion_hotel;
  const direccion_hotel = req.body.direccion_hotel;
  const url_hotel = req.body.url_hotel;
  const telefono_hotel = req.body.telefono_hotel;

  conexion.query("UPDATE hoteles SET nombre_hotel=?, descripcion_hotel=?, direccion_hotel=?, url_hotel=?, telefono_hotel=? WHERE id=?", [nombre_hotel, descripcion_hotel, direccion_hotel, url_hotel, telefono_hotel,id], (err, result) => {
    if(result) {
      res.send("Hotel actualizado con exito");
    }else{
      res.send({message: "Ingresa los registros faltantes!", err})
  }
  })
})

// Esta es la logica que permite eliminar registros de la base de datos
// Metodo DELETE en direccion /delete-res
routerHoteles.delete("/delete-hotel/:id", (req, res) => {

const id = req.params.id;

conexion.query("DELETE FROM hoteles WHERE id=?", id, (err, result) => {
  if(err) {
    console.log(err)
  } else {
    res.send(result)
  }
})
})



// exportamos routersHoteles para mostrarlo y ejecutarlo desde app.js

module.exports = routerHoteles;