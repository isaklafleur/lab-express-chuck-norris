const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.use(express.static('public'));

// creates an absolute path pointing to a folder called "views"
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Index Route:
app.get('/', (req, res, next) => {
  res.render('index');
});

// Random Route:
app.get('/random', (req, res, next) => {
  // Retrieve a random chuck joke
  client.getRandomJoke()
  .then((response) => {
    console.log(response);
  }).catch((err) => {
    // handle error
  });
  
  res.render('random', { response });
});

  // Server Started
app.listen(3000, () => {
  console.log('Server started, app listening on port 3000!')
});
