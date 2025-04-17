import { userDao } from "../persistence/dao/user.dao.js";
import { comparePassword, hashPassword } from "../utils/hasPassword.js";

class UserServices {
  async createUser(data) {
    const user = await userDao.findOne({ email: data.email });
    if (user) return null; // Le avisamos que el usuario existe
    const newUser = {
      ...data,
      password: hashPassword(data.password),
    };
    return await userDao.create(newUser);
  }

  async loginUser(email, password) {
    const user = await userDao.findOne({ email });
    if (!user || !comparePassword(user.password, password)) return { message: "Email o password no válido" };
    return user;
  }

  async findOne(query){
    return await userDao.findOne(query);
  }
}

export const userServices = new UserServices();
