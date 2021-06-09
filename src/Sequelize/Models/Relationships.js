module.exports = (sequelize) => {
  // Relacion Usuario - Direccion
  sequelize.models.usuario.hasOne(sequelize.models.direccion, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  sequelize.models.direccion.belongsTo(sequelize.models.usuario, {
    foreignKey: { allowNull: false },
  });

  //Relacion Usuario- Driver
  sequelize.models.usuario.hasOne(sequelize.models.driver, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  sequelize.models.driver.belongsTo(sequelize.models.usuario, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  //Relacion Usuario - Emprendimiento

  sequelize.models.usuario.hasOne(sequelize.models.emprendimiento, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  sequelize.models.emprendimiento.belongsTo(sequelize.models.usuario, {
    foreignKey: { allowNull: false },
  });

  //Relacion Driver - Vehiculo
  sequelize.models.vehiculo.hasOne(sequelize.models.driver);

  sequelize.models.driver.belongsTo(sequelize.models.vehiculo, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  //Relacion Emprendimiento - Vehiculo

  sequelize.models.vehiculo.hasOne(sequelize.models.emprendimiento);

  sequelize.models.emprendimiento.belongsTo(sequelize.models.vehiculo, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  //Relacion Driver - empre_driver
  sequelize.models.empre_drive.hasMany(sequelize.models.driver),
    { onDelete: "CASCADE", onUpdate: "CASCADE" };

  sequelize.models.driver.belongsTo(sequelize.models.empre_drive, {
    foreignKey: { allowNull: false },
  });

  //Relacion Emprendimiento - Suscripcion
  sequelize.models.emprendimiento.hasMany(sequelize.models.suscripcion, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  sequelize.models.suscripcion.belongsTo(sequelize.models.emprendimiento, {
    foreignKey: { allowNull: false },
  });

  //Relacion CuentaBanca - Emprendimiento

  sequelize.models.emprendimiento.hasOne(sequelize.models.cuenta_banca, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  sequelize.models.cuenta_banca.belongsTo(sequelize.models.emprendimiento, {
    foreignKey: { allowNull: false },
  });

  //Relacion CuentaCripto - Emprendimiento
  sequelize.models.emprendimiento.hasOne(sequelize.models.cuenta_crypto, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  sequelize.models.cuenta_crypto.belongsTo(sequelize.models.emprendimiento, {
    foreignKey: { allowNull: false },
  });

  //Relacion CuentaPaypal - Emprendimiento

  sequelize.models.emprendimiento.hasOne(sequelize.models.cuenta_paypal, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  sequelize.models.cuenta_paypal.belongsTo(sequelize.models.emprendimiento, {
    foreignKey: { allowNull: false },
  });

  //Relacion Producto - Emprendimiento

  sequelize.models.emprendimiento.hasMany(sequelize.models.producto, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  sequelize.models.producto.belongsTo(sequelize.models.emprendimiento, {});

  //Relacion Pedido - Driver

  sequelize.models.driver.hasMany(sequelize.models.pedido);

  sequelize.models.pedido.belongsTo(sequelize.models.driver);

  //Relacion Producto - Descuento

  sequelize.models.producto.hasMany(sequelize.models.descuento);

  sequelize.models.descuento.belongsTo(sequelize.models.producto, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  //Relacion Producto - Promocion

  sequelize.models.producto.hasMany(sequelize.models.promocion, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  sequelize.models.promocion.belongsTo(sequelize.models.producto, {});

  //Relacion Producto - Subcategoria

  sequelize.models.subcategoria.hasMany(sequelize.models.producto, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  sequelize.models.producto.belongsTo(sequelize.models.subcategoria);

  //Relacion Categoria - Subcategoria

  sequelize.models.categoria.hasMany(sequelize.models.subcategoria, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  sequelize.models.subcategoria.belongsTo(sequelize.models.categoria);

  //Relacion Producto - Combo (A traves de combo_producto)

  sequelize.models.producto.belongsToMany(sequelize.models.combo, {
    through: "combo_producto",
  });

  sequelize.models.combo.belongsToMany(sequelize.models.producto, {
    through: "combo_producto",
  });

  //Relacion Pedido - PuntajeEmprende

  sequelize.models.pedido.hasOne(sequelize.models.puntaje_emprende);

  sequelize.models.puntaje_emprende.belongsTo(sequelize.models.pedido, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  //Relacion Pedido - PuntajeDriver

  sequelize.models.pedido.hasOne(sequelize.models.puntaje_driver);

  sequelize.models.puntaje_driver.belongsTo(sequelize.models.pedido, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  //Relacion Pedido - Comentario

  sequelize.models.pedido.hasOne(sequelize.models.comentario);

  sequelize.models.comentario.belongsTo(sequelize.models.pedido, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  //Relacion Producto - Pedido (a traves de producto-pedido)

  sequelize.models.producto.belongsToMany(sequelize.models.pedido, {
    through: "producto_pedido",
  });

  sequelize.models.pedido.belongsToMany(sequelize.models.producto, {
    through: "producto_pedido",
  });

  return sequelize;
};
