/* Todas las funciones de este documento pueden ejecutarse de manera Generica para cada uno de los Modelos
    Simplemente se deben importar en cada uno de los controladores y se les pasa como parametro el modelo
    al cual se les quiere asociar. 
*/

// Funcion Generica que trae un elemento del modelo filtrando por su ID
export const getOne = (model) => async (req, res) => {
  try {
    //Se utiliza el metodo generico findByPk que nos consigue una entidad basandose en su Primary Key.
    //Como sabemos que TODOS los modelos tienen Primary Key esta funcion se puede aplicar a todos.
    const doc = await model.findByPk(req.params.id);

    //Si no encontramos nada pues decimos eso.
    if (!doc) {
      return res
        .status(400)
        .json({ message: "No se encontro la informacion", data: [{}] })
        .end();
    }

    // Como bien puede que sí encontremos algo, en ese caso lo retornamos.
    return res
      .status(200)
      .json({ message: "Data encontrada de manera exitosa", data: [doc] });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

//Funcion Generica que trae TODAS las entidades que pertenecen a un modelo determinado.
export const getMany = (model) => async (req, res) => {
  try {
    //Ejecutamos el metodo .findAll que nos retorna TODAS las entidades de cualquier modelo sobre el cual se invoque.
    //Como la funcion esta definida sobre todos los modelos pues realmente sirve bien a nuestros propositos.
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

// Funcion Generica que trae un elemento del modelo filtrando por sus atributos (Nombre, Apellido, Precio, etc)
// Los atributos en base a los que se le va a filtrar tienen que pertenecer al modelo.
export const getSome = (model) => async (req, res) => {
  try {
    //Ejecutamos la funcion findAll pero le pasamos entre sus opciones una clausula where que filtre la informacion
    //En base a la peticion del usuario.
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
// Funcion Generica que actualiza multiples elementos de un modelo.
export const updateSome = (model) => async (req, res) => {
  try {
    //Se invoca la funcion update, pasandole los cambios en un atributo changes de la request.
    //Y pasando los filtros de busqueda en un atributo where de la request.
    //De este modo se pueden actualizar multiples elementos en batch.
    const doc = await model.update(req.body.changes, {
      returning: true,
      where: req.body.where,
    });

    //Si no retorna nada significa que ningun elemento fue actualizado.
    if (!doc[0]) {
      return res
        .status(400)
        .json({ message: "No se encontro la informacion", data: [{}] })
        .end();
    }
    //Si no entra al if anterior significa que sí actualizó elementos. Por ello mostramos los elementos recien actualizados.
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
    //Buscamos un elemento en base a su Primary Key con la funcion findByPk. Todos los elementos tienen
    //Primary Key, por lo cual esta funcion se puede llamar independientemente del modelo que estemos trabajando.
    let doc = await model.findByPk(req.params.id);

    await doc.update(req.body);
    //Puede que no encontremos ningun elemento con la id requerida.
    if (!doc) {
      return res
        .status(400)
        .json({ message: "No se encontro la informacion", data: [{}] })
        .end();
    }
    //Como puede que sí encontremos un elemento con el id requerido y lo actualicemos exitosamente.
    return res.status(200).json({
      message: "Informacion Actualizada de manera exitosa",
      data: [doc],
    });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

// Funcion que crea un elemento de un modelo.
export const createOne = (model) => async (req, res) => {
  try {
    //Se ejecuta la funcion .create para el modelo recibido como parametro.
    //Crear CUALQUIER modelo se hace con esta funcion, por eso esta misma funcion sirve para TODOS los modelos.
    const doc = await model.create(req.body);

    //Puede que si no recibimos la informacion completa no se haga la creacion. Para eso este if.
    if (!doc) {
      return res
        .status(400)
        .json({ message: "No se pudo crear la informacion", data: [{}] })
        .end();
    }

    //Pero si todos los datos necesarios están se creará la entidad.
    return res
      .status(200)
      .json({ message: "Informacion Creada con Exito", data: [doc] });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

// Funcion que elimina* un elemento de un modelo (Buscando por ID)
// * La eliminacion de un elemento es LOGICA, es decir. Simplemente les colocara un timestamp en su deletedAt
export const deleteOne = (model) => async (req, res) => {
  try {
    // findByPk es una funcion que busca un elemento por su Primary Key
    //Absolutamente TODOS los modelos tienen Primary Key, por eso esta funcion puede ser generica.
    const doc = await model.findByPk(req.params.id);

    //Si no se encontró el elemento a Eliminar no hay nada que se pueda hacer.
    if (!doc) {
      return res
        .status(400)
        .json({ message: "No se pudo Encontrar la informacion", data: [{}] })
        .end();
    }
    //Al invocar el metodo .destroy() Sobre el elemento este es eliminado de la BD
    doc.destroy();

    //Finalmente se retorna el elemento recien eliminado.
    return res
      .status(200)
      .json({ message: "Tupla Eliminada exitosamente", data: [doc] });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

// Se exportan todas las funciones en un JSON (Mas facil exportarlas asi que una a una)
export const defaultCrudCallbacks = (model) => ({
  deleteOne: deleteOne(model),
  getOne: getOne(model),
  getSome: getSome(model),
  updateSome: updateSome(model),
  getMany: getMany(model),
  updateOne: updateOne(model),
  createOne: createOne(model),
});
