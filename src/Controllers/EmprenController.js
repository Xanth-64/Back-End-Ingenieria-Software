const sequelize = require("../Sequelize/modelingIndex");

export async function postEmpren(req, res) {
  console.log(req.body);
  const {
    nombre,
    descripcion,
    valoracion,
    esta_suscrito,
    transporte_hab,
    direccion,
    usuarioIdUsuario,
  } = req.body;

  try {
    let new_empren = await sequelize.models.negocio.create({
      nombre,
      descripcion,
      valoracion,
      esta_suscrito,
      transporte_hab,
      direccion,
      usuarioIdUsuario,
    });
    if (new_empren) {
      return res.json({
        message: "Entrepreneurship created",
        dato: new_empren,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Todo mal", data: {} });
  }
}
export async function getEmpren(req, res) {
  const { id_negocio } = req.params;

  const empren = await sequelize.models.negocio.findOne({
    where: {
      id_negocio,
    },
  });
  res.json({ data: empren });
}

export async function putEmpren(req, res) {
  const { id_negocio } = req.params;
  const {
    nombre,
    descripcion,
    valoracion,
    esta_suscrito,
    transporte_hab,
    direccion,
    usuarioIdUsuario,
  } = req.body;
  const datos = await sequelize.models.negocio.findAll({
    attributes: [
      "id_negocio",
      "nombre",
      "descripcion",
      "valoracion",
      "esta_suscrito",
      "transporte_hab",
      "direccion",
      "usuarioIdUsuario",
    ],
    where: {
      id_negocio,
    },
  });

  if (datos.length > 0) {
    datos.forEach(async (dato) => {
      await dato.update({
        nombre,
        descripcion,
        valoracion,
        esta_suscrito,
        transporte_hab,
        direccion,
        usuarioIdUsuario,
      });
    });
  }

  return res.json({
    message: "Actaulizado",
    data: datos,
  });
}