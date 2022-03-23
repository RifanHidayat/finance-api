"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Journal_transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      journal_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      debit: {
        type: Sequelize.DECIMAL(12, 0),
        allowNull: false,
      },
      credit: {
        type: Sequelize.DECIMAL(12, 0),
        allowNull: false,
      },
      job: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      memo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tax: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Journal_transactions");
  },
};
