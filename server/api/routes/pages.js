let router = require('express').Router()
let pagesController = require('../controllers/pagesController')

router.route('/pages')
    .get( pagesController.findAll )

router.route('/pages/:page_name')
    .get( pagesController.findByName )

module.exports = router