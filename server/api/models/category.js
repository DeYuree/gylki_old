let mongoose = require('mongoose')

let CategorySchema = mongoose.Schema({
    active: Boolean,
    description: String,
    icon: String,
    link: String,
    name: String
}, { collection: 'categories' })

module.exports = mongoose.models.Category || mongoose.model('Category', CategorySchema)