module.exports = (sequelize) => {
  const subcat = sequelize.define(
    "subcategoria",
    {
      id_subcat: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return subcat;
};
