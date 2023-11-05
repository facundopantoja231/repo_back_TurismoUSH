const express = require("express")
const conexion = require("../conexion")

const routerUsers = express.Router()



routerUsers.post("/register", (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correoElectronico = req.body.correoElectronico;
    const nombreUsuario = req.body.nombreUsuario;
    const contraseña = req.body.contraseña;
  
    conexion.query("INSERT INTO usuarios (nombre, apellido, correoElectronico, nombreUsuario, contraseña) VALUES (?, ?, ?, ?, ?)", [nombre, apellido, correoElectronico, nombreUsuario, contraseña], (err, result) => {
        if(result) {
            res.send(result);
        }else{
            res.send({message: "Ingresa los registros faltantes!"})
        }
    })
  })

  routerUsers.post("/login", (req,res) => {
    const nombreUsuario = req.body.nombreUsuario;
    const contraseña = req.body.contraseña;
  
    conexion.query("SELECT * FROM usuarios WHERE nombreUsuario = ? AND contraseña = ?", [nombreUsuario, contraseña], (err, result) => {
        if(err){
            req.setEncoding({err: err});
        }else{
            if(result.length > 0) {
                res.send(result);
            }else{
                res.send({message: "Error en el usuario o contraseña!"})
            }
        }
    })
  })


module.exports = routerUsers;