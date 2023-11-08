// Importación de express y cors

const express = require("express");
const app = express();
const cors = require("cors");

// importación de rutas

const routerUsers = require("./routes/users.js");
const routerRestaurants = require("./routes/restaurants.js");
const routerExcursiones = require("./routes/excursiones.js");

app.use(cors());
app.use(express.json());
app.use("/api/users", routerUsers);
app.use("/api/restaurants", routerRestaurants);
app.use("/api/excursiones", routerExcursiones);

// mensaje

app.get("/", (req,res) => {
    res.send("Turismo Ushuaia")
})

// definición de puerto de conexión

const port = 3202;

// mensaje si la conexión al puerto es exitosa

app.listen(port, () => {
    console.log("Servidor en puerto: " + port)
})