'use strict';

// Editando uma coluna com migrations
// Essa migration serve para não permitir que e-mails se repitam na tabela de alunos "students"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      // Alterando a tabela students, campo/atributo "email"
      'students',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    );
  },

  // eslint-disable-next-line
  async down(queryInterface, Sequelize) {},
};
