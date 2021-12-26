"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class account_mapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // account_mapping.belongsTo(models.account, {
      //   foreignKey: {
      //     name: "account_id",
      //   },
      // });
      account_mapping.belongsTo(models.account, {
        foreignKey: {
          name: "account_id",
        },
        as: "account",
      });
      account_mapping.belongsTo(models.account, {
        foreignKey: {
          name: "coa",
        },
        as: "chart_of_account",
      });
    }
  }
  account_mapping.init(
    {
      name: DataTypes.STRING,
      account_id: DataTypes.INTEGER,
      coa: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "account_mapping",
    }
  );
  return account_mapping;
};
