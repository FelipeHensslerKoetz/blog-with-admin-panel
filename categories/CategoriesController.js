const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

router.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/new");
});

router.post("/categories/save", (req, res) => {
  const { title } = req.body;

  if (title === undefined) res.redirect("/admin/categories/new");

  Category.create({
    title: title,
    slug: slugify(title),
  })
    .then(() => res.redirect("/admin/categories/index"))
    .catch((err) => console.log(err));
});

router.get("/admin/categories", (req, res) => {
  Category.findAll()
    .then((categories) => {
      res.render("admin/categories/index", { categories });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
