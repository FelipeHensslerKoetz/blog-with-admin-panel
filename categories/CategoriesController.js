const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

router.get("/admin/categories", (req, res) => {
  Category.findAll()
    .then((categories) => {
      res.render("admin/categories/index", { categories });
    })
    .catch((err) => console.log(err));
});

router.post("/admin/categories", (req, res) => {
  const { title } = req.body;

  if (title === undefined) res.redirect("/admin/categories/new");

  Category.create({
    title: title,
    slug: slugify(title),
  })
    .then(() => res.redirect("/admin/categories"))
    .catch((err) => console.log(err));
});

router.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/new");
});

router.post("/admin/categories/:categoryId/delete", (req, res) => {
  const { categoryId } = req.params;

  if (categoryId !== null && !isNaN(categoryId)) {
    Category.destroy({ where: { id: categoryId } })
      .then(() => {
        res.redirect("/admin/categories");
      })
      .catch((err) => res.redirect("/admin/categories"));
  } else {
    res.redirect("/admin/categories");
  }
});

router.get("/admin/categories/:categoryId/edit", (req, res) => {
  const { categoryId } = req.params;

  if (categoryId !== undefined && !isNaN(categoryId)) {
    Category.findByPk(categoryId)
      .then((category) => {
        res.render("admin/categories/edit", { category });
      })
      .catch((err) => res.redirect("/admin/categories"));
  } else {
    res.redirect("/admin/categories");
  }
});

router.post("/admin/categories/:categoryId/edit", (req, res) => {
  const { title } = req.body;
  const { categoryId } = req.params;

  if (!isNaN(categoryId)) {
    Category.update(
      { title, slug: slugify(title) },
      {
        where: { id: categoryId },
      }
    )
      .then(() => {
        res.redirect("/admin/categories");
      })
      .catch((err) => {
        res.redirect("/admin/categories");
      });
  } else {
    res.redirect("/admin/categories");
  }
});

module.exports = router;
