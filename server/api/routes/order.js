let router = require('express').Router()
let orderController = require('../controllers/orderController')

router.route('/order')
    .post( orderController.addNew )

module.exports = router
