let Carousel = require('../models/carousel')

exports.findAll = async (req, res) => {
    try {
        res.status(200).json( await Carousel.find( {active: true} ))
    } catch(err) {
        res.status(404).json(err)
    }
}