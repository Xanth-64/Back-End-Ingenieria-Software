import sequelize from "../Sequelize/modelingIndex";
import jwt from "jsonwebtoken";

export const createToken = (user) => {
  return jwt.sign(
    { id: user.id_usuario, email: user.email, tipo: user.tipo },
    process.env.JWTSECRET,
    {
      expiresIn: process.env.JWTEXPIRATION,
    }
  );
};

export const validateToken = (token) => {
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWTSECRET, (err, payload) => {
      if (err) {
        return reject(err);
      }
      resolve(payload);
    });
  });
};

export const signUp = async (req, res) => {
  if (
    !req.body.tipo ||
    !req.body.password ||
    !req.body.nombre ||
    !req.body.apellido ||
    !req.body.email ||
    !req.body.telefono
  ) {
    return res.status(400).send({
      message: "Intento de Autenticación Fallida debido a falta de Datos",
    });
  }

  try {
    const newUser = await sequelize.models.usuario.create(req.body);

    if (!newUser) {
      return res
        .status(400)
        .send({ message: "Creación de Usuario Fallida", data: [] });
    }
    const token = createToken(newUser);
    return res
      .status(200)
      .send({ message: "Usuario Creado Exitosamente", data: [token] });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

export const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      message: "email y password requeridos, autenticación inválida.",
      data: [],
    });
  }
  try {
    const user = await sequelize.models.usuario.findAll({
      where: {
        email: req.body.email,
      },
    });

    if (!user[0]) {
      return res
        .status(400)
        .send({ message: "Username o contraseña Inválida", data: [] });
    }

    const valid = await user[0].validateHash(req.body.password);

    if (!valid) {
      return res
        .status(400)
        .send({ message: "Username o contraseña Inválida", data: [] });
    }

    const token = createToken(user);
    return res
      .status(200)
      .send({ message: "Autenticación Exitosa", data: [token] });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Runtime Error", data: [] });
  }
};
