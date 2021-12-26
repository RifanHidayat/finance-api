"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("account_Transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      amount: {
        type: Sequelize.INTEGER,
        defautValue: 0,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      account_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      source_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      source_table: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("account_Transactions");
  },
};
