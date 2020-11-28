module.exports = function (sequelize, DataTypes) {
  const Ethereum = sequelize.define(
    "ethereum",
    {
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      contract_address: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      eth_address: {
        type: DataTypes.STRING(255),
        unique: true,
      },
    },
    {
      underscored: true,
      tableName: "ethereum",
      timeStamp: true,
    }
  );
  return Ethereum;
};
