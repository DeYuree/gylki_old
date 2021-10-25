let mongoose = require('mongoose')

let PageSchema = mongoose.Schema({
    active: Boolean,
    description: String,
    icon: String,
    link: String,
    title: String,
    order: Number
}, { collection: 'pages' })

module.exports = mongoose.models.Page || mongoose.model('Page', PageSchema)