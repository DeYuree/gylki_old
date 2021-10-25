let mongoose = require('mongoose')

let ProductsProps = mongoose.Schema({
    name: String,
    title: String
}, { collection: 'productsProps' })

module.exports = mongoose.models.ProductsProps || mongoose.model('ProductsProps', ProductsProps)