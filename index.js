const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express()

app.use(express.json());
app.use(cors());


const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "turismo_ush"
})

const port = 3003

app.get("/", (req, res) => {
    res.send("Turismo Ushuaia")
})

app.post("/register", (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correoElectronico = req.body.correoElectronico;
    const nombreUsuario = req.body.nombreUsuario;
    const contraseña = req.body.contraseña;

    con.query("INSERT INTO usuarios (nombre, apellido, correoElectronico, nombreUsuario, contraseña) VALUES (?, ?, ?, ?, ?)", [nombre, apellido, correoElectronico, nombreUsuario, contraseña], (err, result) => {
        if(result) {
            res.send(result);
        }else{
            res.send({message: "Ingresa los registros faltantes!"})
        }
    })
})


app.post("/login", (req,res) => {
    const nombreUsuario = req.body.nombreUsuario;
    const contraseña = req.body.contraseña;

    con.query("SELECT * FROM usuarios WHERE nombreUsuario = ? AND contraseña = ?", [nombreUsuario, contraseña], (err, result) => {
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

app.listen(port, () => {
    console.log(`Conexión exitosa en el puerto ${port}`)
})