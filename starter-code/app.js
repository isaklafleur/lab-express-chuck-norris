const express = require("express");
const app = express();
const Chuck = require("chucknorris-io");
const bodyParser = require("body-parser");
const client = new Chuck();

app.use(express.static("public"));

// instruct the app to use the `bodyParser()` middleware for all routes
// http://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// creates an absolute path pointing to a folder called "views"
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// Index Route:
app.get("/", (req, res, next) => {
  res.render("index");
});

// Random Route:
app.get("/random", (req, res, next) => {
  // Retrieve a random chuck joke
  client
    .getRandomJoke()
    .then(response => {
      // console.log(response);
      res.render("random", { response });
    })
    .catch(err => {
      console.log("The error: ", err);
    });
});

// List Categories Route:
app.get("/categories", (req, res, next) => {
  client
    .getJokeCategories()
    .then(response => {
      // console.log(response);
      res.render("categories", { response });
    })
    .catch(err => {
      console.log("The error: ", err);
    });
});

// Unique Category Route:
app.get("/categories/:categoryId", (req, res, next) => {
  // Retrieve a random chuck joke
  const category = req.params.categoryId;
  client
    .getRandomJoke(category)
    .then(response => {
      // use the response here
      // console.log(response);
      res.render("joke-by-category", { response });
    })
    .catch(err => {
      console.log("The error: ", err);
    });
});

// Search with a keyword for a Joke
app.get("/search", (req, res, next) => {
  res.render("search-form", { response: undefined });
});

// Display Search Result
app.post("/search", (req, res, next) => {
  const keyword = req.body.searchKeyword;
  client
    .search(keyword)
    .then(function(response) {
      // console.log(response);
      res.render("search-form", { response });
    })
    .catch(function(err) {
      console.log("The error: ", err);
    });
});

// Server Started
app.listen(3000, () => {
  console.log("Server started, app listening on port 3000!");
});
