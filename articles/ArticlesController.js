const express = require("express");
const router = express.Router();
const Article = require("./Article");
const Category = require("../categories/Category");
const slugify = require("slugify");
const { route } = require("express/lib/application");

router.get("/admin/articles", (req, res) => {
  Article.findAll({ include: [{ model: Category }] })
    .then((articles) => {
      res.render("admin/articles/index", { articles });
    })
    .catch((err) => console.log(err));
});

router.get("/admin/articles/new", (req, res) => {
  Category.findAll()
    .then((categories) => res.render("admin/articles/new", { categories }))
    .catch((err) => res.redirect("/admin/articles"));
});

router.post("/admin/articles", (req, res) => {
  const { title, body, category } = req.body;

  Article.create({ title, body, slug: slugify(title), categoryId: category })
    .then(() => res.redirect("/admin/articles"))
    .catch((err) => console.log(err));
});

router.post("/admin/articles/:articleId/delete", (req, res) => {
  const { articleId } = req.params;

  if (!isNaN(articleId)) {
    Article.destroy({ where: { id: articleId } })
      .then(() => {
        res.redirect("/admin/articles");
      })
      .catch((err) => {
        res.redirect("/admin/articles");
      });
  } else {
    res.redirect("/admin/articles");
  }
});

module.exports = router;
