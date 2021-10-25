const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

// const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@clustergylki.gbp4z.mongodb.net/gylki_main?retryWrites=true&w=majority`
const connectionString = `mongodb+srv://admin_mongodb:Qq23111987@clustergylki.gbp4z.mongodb.net/gylki_main?retryWrites=true&w=majority`
// const connectionString = `mongodb://admin_mongodb:Qq23111987@clustergylki-shard-00-00.gbp4z.mongodb.net:27017,clustergylki-shard-00-01.gbp4z.mongodb.net:27017,clustergylki-shard-00-02.gbp4z.mongodb.net:27017/gylki_main?ssl=true&replicaSet=atlas-wokuhq-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.set('useFindAndModify', false)

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Database is connected")
})
.catch((err) => {
    console.log("Database connection error: " + err)
    process.exit()
}) 

module.exports = mongoose