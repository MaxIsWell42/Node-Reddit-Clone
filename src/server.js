// Initialize
const express = require('express')
const app = express()
const path = require("path")
const port = 3000

// Middleware
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Set db
const db = require('./data/reddit-db');
const posts = require('./controllers/posts.js')(app);

// Must come after defining the app and before routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

// Engine
app.engine('handlebars', exphbs({
    layoutsDir: __dirname + "/views/layout",
    defaultLayout: 'main'
}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

// Run on port
require('./controllers/posts.js')(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})