"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      codigo: {
        type: Sequelize.STRING,
      },
      reg_origem: {
        type: Sequelize.STRING,
      },
      reg_destino: {
        type: Sequelize.STRING,
      },
      cod_loggi: {
        type: Sequelize.STRING,
      },
      cod_vendedor: {
        type: Sequelize.STRING,
      },
      tipo_produto: {
        type: Sequelize.STRING,
      },
      isvalid: {
        type: Sequelize.BOOLEAN,
      },
      invalidObs: {
        type: Sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
