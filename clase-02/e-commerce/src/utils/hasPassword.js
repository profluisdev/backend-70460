import bcrypt from "bcrypt";

// Función que hashea el password
export const hashPassword = async (password) => {
  const salt = await  bcrypt.genSalt(10);
  return await  bcrypt.hash(password, salt);
};

// Función que compara los password
export const comparePassword = async (userPassword, receivedPassword) => {
  return await bcrypt.compare(receivedPassword, userPassword);
}
