const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})