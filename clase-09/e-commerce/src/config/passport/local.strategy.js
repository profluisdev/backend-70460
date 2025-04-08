import passport from "passport";
import { Strategy } from "passport-local";
import { userDao } from "../../persistence/mongo/dao/user.dao.js";
import { comparePassword, hashPassword } from "../../utils/hasPassword.js";
import { cartDao } from "../../persistence/mongo/dao/cart.dao.js";

// Estrategia de registro

const registerStrategy = new Strategy(
  { passReqToCallback: true, usernameField: "email" },
  async (req, username, password, done) => {
    try {
      const user = await userDao.getOne({ email: username });
      if (user) return done(null, false, { message: "El usuario ya existe" });
      const newCart = await cartDao.create();
      
      // En caso que el usuario no este registrado, procedemos con el registro
      const newUser = {
        ...req.body,
        password: hashPassword(password),
        cart: newCart._id,
      };

      const userCreate = await userDao.create(newUser);

      return done(null, userCreate);
    } catch (error) {
      done(error);
    }
  }
);

// Registramos la estrategia de register
passport.use("register", registerStrategy);

// Estrategia de login

const loginStrategy = new Strategy({ usernameField: "email" }, async (username, password, done) => {
  try {
    const user = await userDao.getOne({ email: username });
    if (!user || !comparePassword(user.password, password))
      return done(null, false, { message: "Email o password no válidos" });

    // En caso que las credenciales esten bien
    return done(null, user);
  } catch (error) {
    done(error);
  }
});

// Registramos la estrategia de login en passport
passport.use("login", loginStrategy);

// Serialization
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialized
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userDao.getOne({ _id: id });
    done(null, user);
  } catch (error) {
    done(error);
  }
});
