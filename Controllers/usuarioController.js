const Usuario = require("../models/Usuario");

//login
exports.loginUser = async (req, res, next) => {
  const usuario = await Usuario.find({ usuario: req.body.usuario });
  console.log({ usuario });
  try {
    if (usuario.length === 0) {
      res.status(404).send({ error: "no existe el usuario." });
    } else {
      const user = usuario[0];
      if (user.contraseña === req.body.contraseña) {
        res.json(usuario[0]);
      } else {
        res.status(401).send({ error: "Contraseña incorrecta." });
      }
    }
  } catch (error) {
    console.log(error);
    next();
  }
};

//cuando se crea un nuevo usuario
exports.nuevoUsuario = async (req, res, next) => {
  //crear un nuevo objeto de usuario con los datos de req.body
  const usuario = new Usuario(req.body);

  try {
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    console.log(error);
    next();
  }
};

//find by user
exports.getUser = async (req, res, next) => {
  try {
    const usuario = await Usuario.find({ usuario: req.params.user });
    if (usuario.length === 0) {
      res.json(null);
    } else {
      res.json(usuario);
    }
  } catch (error) {
    console.log(error);
    next();
  }
};

//obtener todos los usuarios
exports.obtenerUsuarios = async (req, res, next) => {
  try {
    const usuarios = await Usuario.find({});
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    next();
  }
};

//eliminar un usuario por su id
exports.eliminarUsuario = async (req, res, next) => {
  try {
    await Usuario.findByIdAndDelete({ _id: req.params.id });
    res.json({ mensaje: "El usuario fue eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};
