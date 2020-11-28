module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      firstname: DataTypes.STRING(255),
      lastname: DataTypes.STRING(255),
      email: {
        type: DataTypes.TEXT,
        validate: {
          len: [15],
        },
        ethereum_id: {
          type: DataTypes.INTEGER(11),
          references: {
            model: "Ethereum",
            key: "id",
          },
        },
      },
    },
    {
      underscored: true,
      tableName: "user",
      timeStamp: true,
    }
  );
  User.associate = function (models) {
    User.belongs(models.Ethereum, {
      foreignKey: "ethereum_id",
      as: "ethereum",
    });
  };
  return User;
};
