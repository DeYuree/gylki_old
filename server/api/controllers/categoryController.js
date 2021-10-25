let Category = require('../models/category')

exports.findAll = async (req, res) => {
    try {
        res.status(200).json( await Category.find( {active: true} ) )
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.findByName = async (req, res) => {
    try {
        res.status(200).json( await Category.findOne( {active: true, link: req.params.current_cat} ) )
    } catch (err) {
        res.status(404).json(err)
    }
}

exports.findById = async (req, res) => {
    try {
        res.status(200).json( await Category.findById( req.query.id ) )
    } catch(err) {
        res.status(404).json(err)
    }
}
 
// exports.addNewCategory = async (req, res) => {
//     try {
//         let category = new Category({
//             name: req.body.name
//         })

//         let newCategory = await category.save();
     
//       res.status(200).json({ data: newCategory });
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// }