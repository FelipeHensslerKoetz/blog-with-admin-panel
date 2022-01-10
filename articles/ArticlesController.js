const express = require("express");
const router = express.Router();
const Article = require("./Article");

router.get("/admin/articles", (req, res) => {
  res.render("admin/articles/index");
});

router.get("/admin/articles/new", (req, res) => {
  res.render("admin/articles/new");
});

router.post("/admin/articles", (req, res) => {});

module.exports = router;
