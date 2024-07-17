// export const isRoleValid = async (rol = "") => {
//   const existeRol = await Role.findOne({ rol });
//   if (!existeRol) {
//     throw new Error(`El rol ${rol} no esta regitrado en la base de datos`);
//   }
// };

//Verificar si el correo ya existe

// const verificarEmail = async (correo = "") => {
//   const existeEmail = await Usuario.findOne({ correo });
//   if (existeEmail) {
//     // return res.status(400).json({
//     //     err: "El correo ya esta registrado"
//     // })
//     throw new Error(`El correo:${correo} ya esta registrado`);
//   }
// };

//Verificar si el ID exite

const existeUsuarioPorID = async (id = "") => {
  const existeID = await Usuario.findOne({ id });
  if (!existeID) {
    // return res.status(400).json({
    //     err: "El correo ya esta registrado"
    // })
    throw new Error(`El id:${id} no existe`);
  }

  return true;
};

export const verifyPassword = (password = "") => {
  // Verifica la longitud mínima
  if (password.length < 8) {
    throw new Error(`Password must be at least 8 characters`);
  }

  // Verifica si contiene al menos una letra minúscula, una letra mayúscula y un carácter especial
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasLower) {
    throw new Error(`Password must contain at least one lowercase letter`);
  }

  if (!hasUpper) {
    throw new Error(`Password must contain at least one uppercase letter`);
  }

  if (!hasSpecial) {
    throw new Error(`Password must contain at least one special character`);
  }

  return true;
};
