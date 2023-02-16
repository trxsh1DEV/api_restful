const bcryptjs = require('bcryptjs');
// Os seeds servem pra inserirmos dados na BD pra testes ou situações do tipo.
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Yago 1',
          email: 'yagowasda1@email.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Yago 2',
          email: 'yagowadas2@email.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Yago 3',
          email: 'yagosdasdsa3@email.com',
          password_hash: await bcryptjs.hash('15464152', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  // eslint-disable-next-line
  async down (queryInterface, Sequelize) {

  },
};
