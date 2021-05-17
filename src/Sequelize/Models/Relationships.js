module.exports = (sequelize) => {
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
