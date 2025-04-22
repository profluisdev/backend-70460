import jwt from "jsonwebtoken";
import envsConfig from "../../../clase-11/e-commerce/src/config/envs.config.js";

export const createToken = (user) => {
  const {_id, email } = user;
  const token = jwt.sign({_id, email}, envsConfig.JWT_SECRET, { expiresIn: "60m"})
  return token;
}


export const verifyToken = (token) => {
  try {
    return decode = jwt.verify(token, envsConfig.JWT_SECRET);
    
  } catch (error) {
    return null
  }
}