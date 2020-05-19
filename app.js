const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors")

//Crear servidor
const app = express();

//Conectar base de datos
connectDB();

//Habiltar cors
app.use(cors());


//habilitar express.json
app.use(express.json({extended: true}) );

//Puerto de la app
const PORT = process.env.PORT || 4000;

//Importando rutas
app.use("/api/usuarios", require('./routes/usuarios') );
app.use("/api/proyectos", require('./routes/proyectos') );
app.use("/api/tareas", require('./routes/tareas') );
app.use("/api/auth", require('./routes/auth') );

app.get("/", (req, res) => {
    res.send("hola mundo");
} )

app.listen(PORT, () => {
    console.log(`Servidor en marcha en puerto: ${PORT}`);
})


