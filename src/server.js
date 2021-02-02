const express = require('express')
const app = express()
const path = require("path")
const port = 3000
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
    layoutsDir: __dirname + "/views/layout",
    defaultLayout: 'main'
}))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

app.get('/', function(req, res) {
    res.render("index")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})