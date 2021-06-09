//TODO Definir Controladores para las rutas Basicas de los Usuarios

//GET de 1 Usuario

//POST de 1 Usuario

//PUT de 1 Usuario

//! NO HACER EL DELETE (Los usuarios no tienen porque eliminarse)

const sequelize = require("../Sequelize/modelingIndex");
const { Sequelize, Op, QueryTypes } = require("sequelize");
//el modulo "require" es una funcion que se puede usar para imporar simbolos
//desde otro módulo al ámbito actual

//POST (funcion para poder subir un usuario)

export async function postUsuario(req, res) {
  console.log(req.body); // console para verificar que la informacion
  //req.body contiene pares de datos clave.valor enviados al cuerpo de solicitud

  //Aqui se guardan los datos que se toman de "req.body"
  const {
    tipo,
    nombre,
    apellido,
    email,
    telefono,
    password,
    imagen_url,
  } = req.body;

  //console.log(tipo);

  try {
    //este objeto recibe los datos que quiero guardar en "newuser"
    let newuser = await sequelize.models.usuario.create({
      tipo: tipo,
      nombre: nombre,
      apellido: apellido,
      email: email,
      telefono: telefono,
      password: password,
      imagen_url: imagen_url,
    });
    //Si hay un usuario nuevo en la variable entrara en este if
    if (newuser) {
      //res.jason envia una respuesta en json
      return res.json({
        message: "Projecto creado",
        dato: newuser,
      });
    }
  } catch (e) {
    //si no sale viene el POST lanzara el erro TODO MAL
    console.log(e);
    res.status(500).json({ message: "Todo mal", data: {} });
  }

  //res.send("received");
}

//GET
export async function getUsuario(req, res) {
  //se extra este parametro o dato del URL
  // --http://localhost:3000/api/usuarios/1 -- el 1 es el dato que extraer en este caso
  const { id_usuario } = req.params;

  //findOne obtiene la primera entrada que encuentra, es decir,
  //que cumpla con las opciones a consultar.
  const prueba = await sequelize.models.usuario.findOne({
    //en este caso donde id_ususario
    where: {
      id_usuario,
    },
  });
  res.json({ data: prueba });
}

//PUT
export async function putUsuario(req, res) {
  const { usuario_id } = req.params;
  const {
    tipo,
    nombre,
    apellido,
    email,
    telefono,
    password,
    imagen_url,
    direccion,
  } = req.body;

  //PRIMERO debe hacer una busqueda de el usuario
  //findAll este metodo genera una consulta estandar que recupera todos las entradas de la tabla
  const datos = await sequelize.models.usuario.findAll({
    //se le indican los atributos
    //IMPORTANTE las PK siempre debe estar incluida
    attributes: ["usuario_id", "nombre", "apellido"],
    where: {
      usuario_id,
    },
  });

  //Si mas de 1 dato entraa en el if
  if (datos.length > 0) {
    //forEach metodo que permite ejecutar la funcion indicada una vez por cada elemento aarray
    datos.forEach(async (dato) => {
      await dato.update({
        nombre,
        apellido,
      });
    });
  }

  return res.json({
    message: "Actaulizado",
    data: datos,
  });
}

//Buscar la dirección de un usuario
export async function getUsuarioDireccion(req, res) {
  const { usuario_id } = req.params;

  try {
    const direccion = await sequelize.query(
      `SELECT direccion.* FROM usuario
      INNER JOIN direccion ON "direccion"."usuarioIdUsuario" = usuario.id_usuario
      WHERE usuario.id_usuario = (:id);`,

      {
        type: QueryTypes.SELECT,
        replacements: { id: usuario_id },
      }
    );

    if (direccion) {
      return res.json({
        message: "Dirección encontrada",
        data: direccion,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "ERROR", data: {} });
  }
}

import { defaultCrudCallbacks } from "./crud";

//Cruds por default del Modelo de Usuario
export default defaultCrudCallbacks(sequelize.models.usuario);
