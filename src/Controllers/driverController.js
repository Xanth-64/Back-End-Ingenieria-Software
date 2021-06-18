const sequelize = require("../Sequelize/modelingIndex");
const { Sequelize, Op, QueryTypes } = require("sequelize");

//PARA SABER MAS REVISAR userControllers.js  donde esta documentado

//* Funciones Realizadas anteriormente, reemplazadas por CRUDS genericos pero igualmente de valor

// export async function postDriver(req, res) {
//   console.log(req.body);
//   const {
//     cuota,
//     valoracion,
//     usuarioIdUsuario,
//     empresaTransportistaIdEmpresa,
//   } = req.body;

//   try {
//     let new_driver = await sequelize.models.transportista.create({
//       cuota,
//       valoracion,
//       usuarioIdUsuario,
//       empresaTransportistaIdEmpresa,
//     });
//     if (new_driver) {
//       return res.json({
//         message: "Driver created",
//         dato: new_driver,
//       });
//     }
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ message: "Todo mal", data: {} });
//   }
// }
// export async function getDriver(req, res) {
//   const { id_transportista } = req.params;

//   const driver = await sequelize.models.transportista.findOne({
//     where: {
//       id_transportista,
//     },
//   });
//   res.json({ data: driver });
// }

// export async function putDriver(req, res) {
//   const { id_transportista } = req.params;
//   const {
//     cuota,
//     valoracion,
//     usuarioIdUsuario,
//     empresaTransportistaIdEmpresa,
//   } = req.body;
//   const datos = await sequelize.models.transportista.findAll({
//     attributes: [
//       "id_transportista",
//       "cuota",
//       "valoracion",
//       "usuarioIdUsuario",
//       "empresaTransportistaIdEmpresa",
//     ],
//     where: {
//       id_transportista,
//     },
//   });

//   if (datos.length > 0) {
//     datos.forEach(async (dato) => {
//       await dato.update({
//         cuota,
//         valoracion,
//         usuarioIdUsuario,
//         empresaTransportistaIdEmpresa,
//       });
//     });
//   }

//   return res.json({
//     message: "Actaulizado",
//     data: datos,
//   });
// }

export const createFromUserAndEmpre = async (req, res) => {
  try {
    const user = await sequelize.models.usuario.findByPk(req.body.userId);
    const empre = await sequelize.models.empre_drive.findByPk(req.body.empreId);
    if (user && empre) {
      const newDriver = await sequelize.models.driver.create({
        tarifa: req.body.tarifa,
        licencia_picture: req.body.licencia_picture,
        certi_salud: req.body.certi_salud,
        active: req.body.active,
      });

      await user.setDriver(newDriver);
      await empre.addDriver(newDriver);

      return res.status(200).json({
        message: "Driver añadido exitosamente",
        data: [newDriver],
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
};

export const getDriversFromEmpre = async (req, res) => {
  try {
    const empre = await sequelize.models.empre_drive.findAll({
      where: {
        id_empre: req.params.id,
      },
      include: {
        model: sequelize.models.driver,
        required: true,
      },
    });

    if (empre) {
      return res.status(200).json({
        message: "Drivers encontrados exitosamente",
        data: empre,
      });
    }
    return res.status(400).json({
      message: "No se encontraron Drivers asociados a la empresa elegida",
      data: [],
    });
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
};

export async function getUsuario_Driver(req, res) {
  const { id } = req.params;

  try {
    const driver = await sequelize.query(
      `SELECT usuario.*from usuario 
      INNER JOIN driver ON "driver"."usuarioIdUsuario"=usuario.id_usuario
      WHERE "driver"."id_transportista"=(:transportista)`,

      {
        type: QueryTypes.SELECT,
        replacements: { transportista: id },
      }
    );
    if (driver) {
      return res.json({
        message: "Usuario Driver extraido",
        data: driver,
      });
    }
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ message: "No se encontro la informacion", data: [{}] });
  }
}

export async function getDriver_Condicion(req, res) {
  const { condi } = req.params;

  try {
    const driver = await sequelize.query(
      `select driver.* FROM driver
        inner join vehiculo ON vehiculo.id_vehiculo="driver"."vehiculoIdVehiculo"
        where vehiculo.condiciones=(:condicion)`,

      {
        type: QueryTypes.SELECT,
        replacements: { condicion: condi },
      }
    );
    if (driver) {
      return res.json({
        message: "Usuario Driver extraido",
        data: driver,
      });
    }
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ message: "No se encontro la informacion", data: [{}] });
  }
}

import { defaultCrudCallbacks } from "./crud";
//Exportacion de los Cruds Basicos para el Modelo de Driver. (Ahora el modelo tiene los Cruds basicos automaticamente.)
export default defaultCrudCallbacks(sequelize.models.driver);
