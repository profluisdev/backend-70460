import express from "express";
import { connectMongoDB } from "./config/mongodb.config.js";
import router from "./router/router.js";
import session from "express-session";

const app = express();

// Conexión con la base de datos
connectMongoDB();

// Middlewares incorporados de Express
app.use(express.json()); // Formatea los cuerpos json de peticiones entrantes.
app.use(express.urlencoded({ extended: true })); // Formatea query params de URLs para peticiones entrantes.
app.use(
  session({
    secret: "secreto-super-seguro", // Clave para firmar la cookie
    resave: true, // Evita guardar la sesión si no hay cambios
    saveUninitialized: true, // Guarda sesiones vacías
    cookie: { secure: false, maxAge: 5000 }, // Debe estar en true si usas HTTPS
    
  })
);

//Rutas
app.use("/api", router);

app.listen(8080, () => {
  console.log("Server on port 8080");
});
