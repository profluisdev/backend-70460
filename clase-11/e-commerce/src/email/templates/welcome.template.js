
export const welcomeUserTemplate = (fullName, email) => {
  return `<h2>Bienvenido ${fullName}</h2>
<div>
  <p>Tu cuenta con el email ${email} a sido registrada con éxito</p>
</div>`
}