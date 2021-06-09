const sequelize = require("../Sequelize/modelingIndex");

//PARA SABER MAS REVISAR userControllers.js  donde esta documentado

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

import { defaultCrudCallbacks } from "./crud";

export default defaultCrudCallbacks(sequelize.models.driver);
