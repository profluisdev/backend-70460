import bcrypt from "bcrypt";

// Función que hashea el password
export const hashPassword = (password) => {
  const salt = bcrypt.genSalt(10);
  return bcrypt.hashSync(password, salt);
};

// Función que compara los password
export const comparePassword = (userPassword, receivedPassword) => {
  return  bcrypt.compareSync(receivedPassword, userPassword);
}
