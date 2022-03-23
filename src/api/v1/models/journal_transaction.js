"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class journal_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      journal_transaction.belongsTo(models.journal, {
        foreignKey: {
          name: "journal_id",
        },
        as: "journal",
      });
      journal_transaction.belongsTo(models.account, {
        foreignKey: {
          name: "account_id",
        },
        as: "account",
      });
    }
  }
  journal_transaction.init(
    {
      journal_id: DataTypes.INTEGER,
      account_id: DataTypes.INTEGER,
      debit: DataTypes.DECIMAL(12, 0),
      credit: DataTypes.DECIMAL(12, 0),
      job: DataTypes.STRING,
      memo: DataTypes.STRING,
      tax: DataTypes.STRING,
      date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "journal_transaction",
    }
  );
  return journal_transaction;
};
