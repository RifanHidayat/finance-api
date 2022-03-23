"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class journal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      journal.hasMany(models.journal_transaction, {
        foreignKey: {
          name: "journal_id",
        },
      });
    }
  }
  journal.init(
    {
      company_id: DataTypes.INTEGER,
      number: DataTypes.STRING,
      date: DataTypes.DATE,
      source: DataTypes.STRING,
      memo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "journal",
    }
  );
  return journal;
};
