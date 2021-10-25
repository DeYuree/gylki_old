let router = require('express').Router()
let productController = require('../controllers/productsController')

router.route('/products')
    .get( productController.findAll )

router.route('/products/for_category')
    .get( productController.findForCurrentCategory )

router.route('/products')
    .post( productController.addAll )

router.route('/products/:current_prod')
    .get( productController.findCurrentProduct )

router.route('/products/:current_prod')
    .put( productController.updateCurrentProduct )

module.exports = router