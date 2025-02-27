import express from "express";
import cookieParser from "cookie-parser";
const app = express();
const PORT = 3000;
// Establecer carpeta de archivos estáticos
app.use(express.static("public"));

// Middleware para manejar cookies firmadas
app.use(cookieParser("miClaveSecreta"));

// Setear una cookie
app.get("/set-cookie", (req, res) => {
  // Crear una cookie
  res.cookie("nombre", "Juan Perez");
  res.send("Cookie guardada");
});

// Obtener una cookie
app.get("/get-cookie", (req, res) => {
  // Obtener cookie
  const cookie = req.cookies.nombre;
  res.send(cookie);
});

// Ruta para establecer una cookie con httpOnly
app.get("/set-httponly-cookie", (req, res) => {
  res.cookie("sessionID", "abcdef123456", { maxAge: 3600000, httpOnly: true });
  res.send("Cookie httpOnly establecida");
});

// Ruta para leer una cookie httpOnly
app.get('/get-httponly-cookie', (req, res) => {
  const sessionID = req.cookies.sessionID;
  res.send(sessionID ? `ID de sesión: ${sessionID}` : 'No hay cookies de sesión establecidas');
});

// Ruta para eliminar una cookie httpOnly
app.get('/delete-httponly-cookie', (req, res) => {
  res.clearCookie('sessionID');
  res.send('Cookie httpOnly eliminada');
});

app.get('/set-secure-signed-cookie', (req, res) => {
  res.cookie('secureToken', 'randomSecureToken123', {
      maxAge: 5000, 
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      signed: true
  });
  res.send('Cookie segura y firmada establecida');
});

app.get('/get-secure-signed-cookie', (req, res) => {
  const secureToken = req.signedCookies.secureToken;
  res.send(secureToken ? `Token validado: ${secureToken}` : 'No hay token válido');
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
