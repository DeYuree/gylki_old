let mongoose = require('mongoose')

let carouselSchema = mongoose.Schema({
    active: Boolean,
    buttonTitle: String,
    link: String,
    src: String,
    subtitle: String,
    title: String
}, { collection: 'carousel' })

module.exports = mongoose.models.Carousel || mongoose.model('Carousel', carouselSchema)