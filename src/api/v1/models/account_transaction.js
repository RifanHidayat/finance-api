"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class account_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      account_transaction.belongsTo(models.account, {
        foreignKey: {
          name: "account_id",
        },
        as: "account",
      });
      account_transaction.belongsTo(models.account, {
        foreignKey: {
          name: "coa",
        },
        as: "chart_of_account",
      });
    }
  }
  account_transaction.init(
    {
      date: DataTypes.DATEONLY,
      amount: DataTypes.INTEGER,
      description: DataTypes.STRING,
      note: DataTypes.STRING,
      image: DataTypes.STRING,
      type: DataTypes.STRING,
      account_id: DataTypes.INTEGER,
      source_id: DataTypes.INTEGER,
      source_table: DataTypes.STRING,
      coa: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "account_transaction",
    }
  );
  return account_transaction;
};
