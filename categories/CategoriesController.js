const express = require("express");
const router = express.Router();

router.get("/categories", (req, res) => {
  res.send("Categories route");
});

router.get("/admin/categories/new", (req, res) => {
  res.send("Create a category as admin");
});

module.exports = router;
