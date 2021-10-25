const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const morgan = require('morgan')
const mongoose = require('./config')
const app = express()



const port = process.env.PORT || 5000

// Parsers for POST data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//registering cors
// app.use(cors({
//     origin: "http://localhost:8081"
// }))
app.use(cors())

// define first route
// app.get('/', (req, res) => {
//     res.json({ message: "Welcome to..." })
// })


/* Access Control Allow Origin */
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next()
})

// app.use(morgan(function (tokens, req, res) {
//     return [
//       tokens.url(req, res),
//       tokens.status(req, res)
//     ].join(' ')
//   }));

// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static(__dirname + '/public/'))

//     app.get('/.*/', (req, res) => res.sendFile(__dirname + '/public/index.html'))
// }

//register all routes
// const categories = require('./api/routes/category')
const routes = require('./api/routes/index')

app.use('/api', routes)

app.listen(port, () => { console.log(`App is running on ${port}`) })

module.exports = app