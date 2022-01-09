const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/connection");
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

// View Engine
app.set("view engine", "ejs");

// Static files
app.use(express.static("public"));

// Accept post requests and JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB sync
connection
  .authenticate()
  .then(() => console.log("Database sync is ok."))
  .catch((err) => console.log(err));

// Routers
app.use("/", categoriesController);
app.use("/", articlesController);

app.get("/", (req, res) => {
  res.render("index");
});

// Server initilization
app.listen(3000, (err) => {
  if (err) console.log(err);
  console.log("Server is running on 3000 port");
});
