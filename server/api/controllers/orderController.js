let Order = require('../models/order')

exports.addNew = async (req, res) => {
    try{
        let newOrder = new Order(req.body.order)
        res.status(200).json( await newOrder.save() )
    } catch(err) {
        res.status(500).json(err)
    }
}