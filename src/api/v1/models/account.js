"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      account.belongsTo(models.category, {
        foreignKey: {
          name: "category_id",
        },
      });
      account.hasMany(models.account_transaction, {
        foreignKey: {
          name: "account_id",
        },
      });
      account.hasOne(models.journal_transaction, {
        foreignKey: {
          name: "account_id",
        },
      });
    }
  }
  account.init(
    {
      number: DataTypes.STRING,
      name: DataTypes.STRING,
      date: DataTypes.DATE,

      type: DataTypes.STRING,
      level: DataTypes.INTEGER,
      init_balance: DataTypes.INTEGER,
      balance: DataTypes.INTEGER,
      parent_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      company_id: DataTypes.INTEGER,
      tax_id: DataTypes.INTEGER,
      is_active: DataTypes.INTEGER,
      account_number: DataTypes.STRING,
      debit: DataTypes.BIGINT,
      credit: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "account",
    }
  );
  return account;
};
