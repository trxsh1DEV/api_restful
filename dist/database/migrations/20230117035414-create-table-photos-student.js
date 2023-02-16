"use strict";// Criando uma tabela para as fotos dos alunos e fazendo relação entre BDs
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('photos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      originalname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // Fazendo relação entre tabelas cm foreinkey
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'students',
          key: 'id',
        },
        // Quando deleta, quando atualiza...
        onDelete: 'CASCADE', // Se eu apagar o aluno, as fotos são deletadas junto
        // onDelete: 'SET NULL', // Manter as fotos e setar o student_id como null
        onUpdate: 'CASCADE',
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  // eslint-disable-next-line
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('photos');
  },
};
