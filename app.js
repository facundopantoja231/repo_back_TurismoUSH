// Importación de express y cors

const express = require("express");
const app = express();
const cors = require("cors");

// importación de rutas

const routerUsers = require("./routes/users.js");

app.use(cors());
app.use(express.json());
app.use("/api/users", routerUsers);

// mensaje

app.get("/", (req,res) => {
    res.send("Mi primer server!")
})

// definición de puerto de conexión

const port = 3002;

// mensaje si la conexión al puerto es exitosa

app.listen(port, () => {
    console.log("Servidor en puerto: " + port)
})