const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const createUserVerify = (req, res, next) => {
  const { user_name, user_surname, user_email, user_password } = req.body;

  // if(!expresiones.usuario.test(user_name)){}
  try {
    if (!expresiones.nombre.test(user_name)) {
      throw new Error(
        'Please enter valid values the username cannot contain numbers or special characters'
      );
    }
    if (!expresiones.nombre.test(user_surname)) {
      throw new Error(
        "Please enter valid values the user's last name cannot contain numbers or special characters"
      );
    }
    if (!expresiones.correo.test(user_email)) {
      throw new Error('Invalid email please make sure to put');
    }
    if (!expresiones.password.test(user_password)) {
      throw new Error(
        'The password must have a minimum of 4 characters and a maximum of 12'
      );
    }
    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export { createUserVerify };
