const sequelize = require("../Sequelize/modelingIndex");
const { QueryTypes } = require("sequelize");
import { defaultCrudCallbacks } from "./crud";

export const crearSuscripcion = async (req, res) => {
  try {
    const doc1 = await sequelize.query(
      'SELECT MAX(fecha_fin) AS fecha FROM "public"."suscripcion" WHERE "public"."suscripcion"."emprendimientoIdNegocio" = (:idEmp)',
      { type: QueryTypes.SELECT, replacements: { idEmp: req.params.id } }
    );
    const fechaPrueba = new Date(doc1[0].fecha);
    if (doc1.length !== 0 && fechaPrueba.getFullYear() > 2015) {
      const fechita = doc1[0].fecha;
      const fechaObj = new Date(fechita);
      console.log(fechaObj.getMonth());

      if (fechaObj.getMonth() + req.body.time > 11) {
        console.log(fechaObj.getMonth());
        fechaObj.setMonth(fechaObj.getMonth() + req.body.time - 11);
        console.log(fechaObj.getMonth());
        fechaObj.setFullYear(fechaObj.getFullYear() + 1);
      } else {
        fechaObj.setMonth(fechaObj.getMonth() + req.body.time);
      }
      const doc2 = await sequelize.models.suscripcion.create({
        fecha_fin: fechaObj.toString(),
        emprendimientoIdNegocio: req.params.id,
      });
      return res
        .status(200)
        .json({ message: "Suscripcion Exitosa", data: [doc2] });
    } else {
      const fechaObj2 = new Date();
      if (fechaObj2.getMonth() + req.body.time > 11) {
        fechaObj2.setMonth(fechaObj2.getMonth() + req.body.time - 11);
        fechaObj2.setFullYear(fechaObj2.getFullYear() + 1);
      } else {
        fechaObj2.setMonth(fechaObj2.getMonth() + req.body.time);
      }
      const doc3 = await sequelize.models.suscripcion.create({
        fecha_fin: fechaObj2.toString(),
        emprendimientoIdNegocio: req.params.id,
      });
      return res
        .status(200)
        .json({ message: "Suscripcion Exitosa", data: [doc3] });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
};

//Exportacion de los Cruds Basicos para el Modelo de Suscripcion. (Ahora el modelo tiene los Cruds basicos automaticamente.)
export default defaultCrudCallbacks(sequelize.models.suscripcion);
