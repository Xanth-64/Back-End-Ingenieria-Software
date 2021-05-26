module.exports = (sequelize) => {
  //Relacion 1:1 - usuario:negocio
  sequelize.models.usuario.hasOne(sequelize.models.negocio, {
    onDelete: "CASCADE",
  });

  //Assercion de Relacion Mandatoria
  sequelize.models.negocio.belongsTo(sequelize.models.usuario);

  //Relacion 1:1 - usuario:transportista
  sequelize.models.usuario.hasOne(sequelize.models.transportista, {
    onDelete: "CASCADE",
  });

  //Assercion de Relacion Mandatoria
  sequelize.models.transportista.belongsTo(sequelize.models.usuario);

  //Relacion 1:N - empresa_transportistas:transportista
  sequelize.models.empresa_transportistas.hasMany(sequelize.models.transportista, {
    onDelete: "CASCADE",
  });

  //Assercion de Relacion Mandatoria
  sequelize.models.transportista.belongsTo(sequelize.models.empresa_transportistas);

  //Relacion 1:1 - transportista:vehiculo
  sequelize.models.transportista.hasOne(sequelize.models.vehiculo, {
    onDelete: "SET NULL",
  });

  //Relacion 1:1 - negocio:vehiculo
  sequelize.models.negocio.hasOne(sequelize.models.vehiculo, {
    onDelete: "CASCADE",
  });

  //Relacion 1:N - catalogo:subcategoria
  sequelize.models.catalogo.hasMany(sequelize.models.subcategoria, {
    onDelete: "CASCADE",
  });

  //Assercion de Relacion Mandatoria
  sequelize.models.subcategoria.belongsTo(sequelize.models.catalogo);

  //Relacion 1:N - subcategoria:producto
  sequelize.models.subcategoria.hasMany(sequelize.models.producto, {
    onDelete: "SET NULL",
  });

  //Relacion 1:N - producto:descuento
  sequelize.models.producto.hasMany(sequelize.models.descuento, {
    onDelete: "SET NULL",
  });

  //Assercion de Relacion Mandatoria
  sequelize.models.descuento.belongsTo(sequelize.models.producto);

  return sequelize;
};
