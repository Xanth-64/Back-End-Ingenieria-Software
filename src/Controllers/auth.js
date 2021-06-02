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

export const signUp = (req, res) => {};
