const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/connection");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connection
  .authenticate()
  .then(() => console.log("Database sync is ok."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, (err) => {
  if (err) console.log(err);
  console.log("Server is running on 3000 port");
});
