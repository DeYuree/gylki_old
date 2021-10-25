let router = require('express').Router()

let carouselController = require('../controllers/carouselController')

router.route('/carousel')
    .get( carouselController.findAll )

module.exports = router