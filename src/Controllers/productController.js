const sequelize = require("../Sequelize/modelingIndex");

//PARA SABER MAS REVISAR userControllers.js  donde esta documentado

export async function postProducto(req, res) {
  console.log(req.body);
  const { nombre, descripcion, peso, precio, fotos, condiciones } = req.body;

  try {
    let new_product = await sequelize.models.producto.create({
      nombre,
      descripcion,
      peso,
      precio,
      fotos,
      condiciones,
    });
    if (new_product) {
      return res.json({
        message: "Product created",
        dato: new_product,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Todo mal", data: {} });
  }
}
export async function getProducto(req, res) {
  const { id_producto } = req.params;

  const producto = await sequelize.models.producto.findOne({
    where: {
      id_producto,
    },
  });
  res.json({ data: producto });
}

export async function putProducto(req, res) {
  const { id_producto } = req.params;
  const { nombre, descripcion, peso, precio, fotos, condiciones } = req.body;
  const datos = await sequelize.models.producto.findAll({
    attributes: [
      "id_producto",
      "nombre",
      "descripcion",
      "peso",
      "precio",
      "fotos",
      "condiciones",
    ],
    where: {
      id_producto,
    },
  });

  if (datos.length > 0) {
    datos.forEach(async (dato) => {
      await dato.update({
        nombre,
        descripcion,
        peso,
        precio,
        fotos,
        condiciones,
      });
    });
  }

  return res.json({
    message: "Actaulizado",
    data: datos,
  });
}
