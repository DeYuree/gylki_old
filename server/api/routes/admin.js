let router = require('express').Router()

let adminController = require('../controllers/adminController')

router.route('/admin')
    .get( adminController.findAll )

router.route('/admin/gotourl')
    .get( adminController.gotoUrl)

module.exports = router