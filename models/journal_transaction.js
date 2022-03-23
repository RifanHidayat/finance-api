"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Journal_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Journal_transaction.init(
    {
      journal_id: DataTypes.INTEGER,
      account_id: DataTypes.INTEGER,
      debit: DataTypes.DECIMAL(12, 2),
      credit: DataTypes.DECIMAL(12, 2),
      job: DataTypes.STRING,
      memo: DataTypes.STRING,
      tax: DataTypes.STRING,
      date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Journal_transaction",
    }
  );
  return Journal_transaction;
};
