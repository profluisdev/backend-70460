import passport from "passport";
import { Strategy } from "passport-local";
import { userServices } from "../../services/user.services.js";
import { accountService } from "../../services/account.services.js";

const registerStrategy = new Strategy(
  { passReqToCallback: true, usernameField: "email" },
  async (req, username, password, done) => {
    try {
      const newUser = await userServices.createUser(req.body);
      if (!newUser) return done(null, false, { message: "El usuario con ese email ya existe" });

      await accountService.createAccount({ userId: newUser._id, firstName: newUser.firstName, lastName: newUser.lastName });
      const user = await userServices.findOne({_id: newUser._id});
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

passport.use("register", registerStrategy);

const loginStrategy = new Strategy({ usernameField: "email" }, async (username, password, done) => {
  try {
    const response = await userServices.loginUser(username, password);
    if (response.message) return done(null, false, { message: response.message });

    done(null, response);
  } catch (error) {
    done(error);
  }
});

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
