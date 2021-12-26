"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("accounts", "debit", {
      type: Sequelize.BIGINT,
      after: "init_balance",
      defaultValue: 0,
    });
    await queryInterface.addColumn("accounts", "credit", {
      type: Sequelize.BIGINT,
      after: "debit",
      defaultValue: 0,
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
