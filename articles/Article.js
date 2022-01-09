const Sequelize = require("sequelize");
const connection = require("../database/connection");
const Category = require("../categories/Category");

const Article = connection.define("articles", {
  title: { type: Sequelize.STRING, allowNull: false },
  slug: { type: Sequelize.STRING, allowNull: false },
  body: { type: Sequelize.TEXT, allowNull: false },
});

Category.hasMany(Article); // A category has many articles
Article.belongsTo(Category); // A article belongs to a Category

module.exports = Article;
