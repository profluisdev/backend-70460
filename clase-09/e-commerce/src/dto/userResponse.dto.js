export class UserResponseDto {
  constructor(user) {
    // this.first_name = user.first_name;
    // this.last_name = user.last_name;
    this.fullName = `${user.first_name} ${user.last_name}`;
    this.email = user.email;
    this.age = user.age;
    this.role = user.role;
  }

  age(user) {
    try {
      // Algoritmo para calcular la edad en base a la fecha de nacimiento
      // const now = Date.now();
      // const age = now -  user.birthDate; //! No esta bien, se debe hacer con una librería
      // return age;
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
}
