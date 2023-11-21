const express = require("express"); // Importamos express
const app = express(); // Declaramos app como una instancia de express 
const cors = require("cors"); // Importamos cors para permitir solicitudes HTTP entre dominios

const routerUsers = require("./routes/users.js"); // Importamos la ruta users en la constante routeUsers
const routerRestaurants = require("./routes/restaurants.js"); // Idem routerRestaurants
const routerExcursiones = require("./routes/excursiones.js"); // Idem routerExcursiones
const routerHoteles = require("./routes/hoteles.js"); // Idem routerHoteles
const routerReservas = require("./routes/reservas.js"); // Idem routerReservas

app.use(cors()); // Implementamos las funciones de cors dentro de app
app.use(express.json()); // Implementamos la lectura Json dentro de app
app.use("/api/users", routerUsers); // Declaramos la ruta /api/users para routerUsers
app.use("/api/restaurants", routerRestaurants); // Declaramos la ruta /api/restaurants para routerRestaurants
app.use("/api/excursiones", routerExcursiones); // Declaramos la ruta /api/excursiones para routerExcursiones
app.use("/api/hoteles", routerHoteles); // Declaramos la ruta /api/hoteles para routerHoteles
app.use("/api/reservas", routerReservas); // Declaramos la ruta /api/reservas pra routerReservas

app.get("/", (req,res) => { // Solicitud GET a la ruta principal de app
    res.send("Turismo Ushuaia") // Responde con un mensaje "Turismo Ushuaia"
})

const port = 3202; // Creamos una constante que almacena el puerto de conexión

app.listen(port, () => { // Cuando app este escuchando, asignamos que sea en port (3202)
    console.log("Servidor en puerto: " + port) // Si escucha el puerto con exito, se muestra un mensaje en consola
})