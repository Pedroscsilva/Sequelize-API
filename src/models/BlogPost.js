const BlogPostsSchema = (sequelize, DataTypes) => {
  const BlogPostTable = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
   tableName: 'blog_posts',
   underscored: true,
   createdAt: "published",
   updatedAt: "updated"
  });

  BlogPostTable.associate = (models) => {
    BlogPostTable.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
    });
  }

  return BlogPostTable;
}

module.exports = BlogPostsSchema;