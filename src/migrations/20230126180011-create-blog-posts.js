'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blog_posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: Sequelize.STRING,
      content: Sequelize.STRING,
      user_id: {
        references: {
          model: 'users',
          key: 'id'
        },
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
      },
      published: Sequelize.DATE,
      updated: Sequelize.DATE,
    }, {
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('blog_posts');
  }
};
