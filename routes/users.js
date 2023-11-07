// importacion de express y de conexión.js (la base de datos de turismo ushuaia)

const express = require("express")
const conexion = require("../conexion")

// importacion del router Usuarios

const routerUsers = express.Router()


routerUsers.get("/", (req, res) => {
    conexion.query("SELECT * FROM usuarios", (err, result) => {
        if (err) {
          console.error("Error al obtener datos de los usuarios:", err);
          res.status(500).json({ error: "Error al obtener datos de restaurantes" });
        } else {
          res.status(200).json(result); // Devuelve los datos de usuarios en formato JSON
        }
      });
});

// metodo POST para guardar los valores nombre, apellido, correoElectronico, nombreUsuario, contraseña en la base de datos

routerUsers.post("/register", (req, res) => {

// declaramos en constantes los valores a registrar

    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correoElectronico = req.body.correoElectronico;
    const nombreUsuario = req.body.nombreUsuario;
    const contraseña = req.body.contraseña;

// definición de sentencia SQL 

    conexion.query("INSERT INTO usuarios (nombre, apellido, correoElectronico, nombreUsuario, contraseña) VALUES (?, ?, ?, ?, ?)", [nombre, apellido, correoElectronico, nombreUsuario, contraseña], (err, result) => {
        if(result) {

            // en caso de que no se presenten errores, se procede a el envio de datos al servidor

            res.send(result);
        }else{

            // en caso de faltar valores, el mensaje sera...

            res.send({message: "Ingresa los registros faltantes!"})
        }
    })
  })

  // metodo POST para comprobar el inicio de sesión de un usuario registrado en la base de datos

  routerUsers.post("/login", (req,res) => {

// declaramos en constantes los valores que ya se encuentran en la base de datos y se procedera a realizar la validación de usuario

    const nombreUsuario = req.body.nombreUsuario;
    const contraseña = req.body.contraseña;
  

// sentencia SQL que comprobara la existencia de los valores ingresados en la base de datos

    conexion.query("SELECT * FROM usuarios WHERE nombreUsuario = ? AND contraseña = ?", [nombreUsuario, contraseña], (err, result) => {
        if(err){
            req.setEncoding({err: err});
        }else{
            if(result.length > 0) {

                // si los valores ingresados, coinciden con los de la base de datos, se envia el result (se inicia sesión en el front-end y carga el componente HOME)

                res.send(result);
            
            }else{

                // en caso de haber un error, se mostrara en pantalla el error (por lo general sera que el usuario o contraseña es incorrecto o no existe en la base de datos)
                
                res.send({message: "Error en el usuario o contraseña!"})
            
            }
        }
    })
  })

// exportamos routersUsers para mostrarlo y ejecutarlo desde app.js

module.exports = routerUsers;