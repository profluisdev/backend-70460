import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
const app = express();
const PORT = 3000;
// Establecer carpeta de archivos estáticos
app.use(express.static("public"));

// Middleware para manejar cookies firmadas
app.use(cookieParser("miClaveSecreta"));

// Middleware para manejar las session
app.use(
  session({
    secret: "secreto-super-seguro", // Clave para firmar la cookie
    resave: true, // Evita guardar la sesión si no hay cambios
    saveUninitialized: true, // Guarda sesiones vacías
    cookie: { secure: false }, // Debe estar en true si usas HTTPS
  })
);

// Ruta que almacena datos en la sesión
app.get("/set-session", (req, res) => {
  // Definir la session
  req.session.usuario = { nombre: "Juan", rol: "admin" };

  res.send("Session guardada");
});

// Ruta que obtiene datos en la sesión
app.get("/get-session", (req, res) => {
  const sessionData = req.session.usuario;
  if (sessionData) {
    res.send(`Usuario: ${sessionData.nombre}, Rol: ${sessionData.rol}`);
  } else {
    res.send("No hay sesiones activas");
  }
});

// Ruta para destruir la session
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("Sesión cerrada");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
