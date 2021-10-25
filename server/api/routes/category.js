let router = require('express').Router()
let categoryController = require('../controllers/categoryController')

router.route('/categories')
    .get( categoryController.findAll )

router.route('/categories/for_product')
    .get( categoryController.findById )

router.route('/categories/:current_cat')
    .get( categoryController.findByName )




    // .post(function (req, res), categoryController.addNewCategory)
    // // router.get("/:id", categoryController.findOne)
    // // router.put("/:id", categoryController.updateOne)

module.exports = router