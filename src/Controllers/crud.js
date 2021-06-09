export const getOne = (model) => async (req, res) => {
  try {
    const doc = await model.findByPk(req.params.id);
    console.log("entro");
    if (!doc) {
      return res
        .status(400)
        .json({ message: "No se encontro la informacion", data: [{}] })
        .end();
    }

    return res
      .status(200)
      .json({ message: "Data encontrada de manera exitosa", data: [doc] });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

export const getMany = (model) => async (req, res) => {
  try {
    const doc = await model.findAll();

    if (!doc) {
      return res
        .status(400)
        .json({ message: "No se encontro la informacion", data: [{}] })
        .end();
    }
    return res
      .status(200)
      .json({ message: "Data encontrada de manera exitosa", data: doc });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

export const getSome = (model) => async (req, res) => {
  try {
    const doc = await model.findAll({
      where: req.body,
    });

    if (!doc) {
      return res
        .status(400)
        .json({ message: "No se encontro la informacion", data: [{}] })
        .end();
    }
    return res
      .status(200)
      .json({ message: "Data encontrada de manera exitosa", data: doc });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

export const updateSome = (model) => async (req, res) => {
  try {
    const doc = await model.update(req.body.changes, {
      returning: true,
      where: req.body.where,
    });

    if (!doc[0]) {
      return res
        .status(400)
        .json({ message: "No se encontro la informacion", data: [{}] })
        .end();
    }
    return res
      .status(200)
      .json({ message: "Data encontrada de manera exitosa", data: doc[1] });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

export const updateOne = (model) => async (req, res) => {
  try {
    let doc = await model.findByPk(req.params.id);

    await doc.update(req.body);
    if (!doc) {
      return res
        .status(400)
        .json({ message: "No se encontro la informacion", data: [{}] })
        .end();
    }

    return res.status(200).json({
      message: "Informacion Actualizada de manera exitosa",
      data: [doc],
    });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

export const createOne = (model) => async (req, res) => {
  console.log(req.body);
  try {
    const doc = await model.create(req.body);
    print(req.body);

    if (!doc) {
      return res
        .status(400)
        .json({ message: "No se pudo crear la informacion", data: [{}] })
        .end();
    }

    return res
      .status(200)
      .json({ message: "Informacion Creada con Exito", data: [doc] });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

export const deleteOne = (model) => async (req, res) => {
  try {
    const doc = await model.findByPk(req.params.id);

    if (!doc) {
      return res
        .status(400)
        .json({ message: "No se pudo Encontrar la informacion", data: [{}] })
        .end();
    }
    doc.destroy();

    return res
      .status(200)
      .json({ message: "Tupla Eliminada exitosamente", data: [doc] });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

export const defaultCrudCallbacks = (model) => ({
  deleteOne: deleteOne(model),
  getOne: getOne(model),
  getSome: getSome(model),
  updateSome: updateSome(model),
  getMany: getMany(model),
  updateOne: updateOne(model),
  createOne: createOne(model),
});
