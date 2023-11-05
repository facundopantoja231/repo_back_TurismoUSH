const express = require("express");
const app = express();
const cors = require("cors");


const routerUsers = require("./routes/users.js");

app.use(cors());
app.use(express.json());
app.use("/api/users", routerUsers);

app.get("/", (req,res) => {
    res.send("Mi primer server!")
})


const port = 3002;

app.listen(port, () => {
    console.log("Servidor en puerto: " + port)
})