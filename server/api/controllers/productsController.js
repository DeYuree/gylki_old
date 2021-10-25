let Product = require('../models/products')

exports.findAll = async (req, res) => {
	try {
		let product = await Product.find()
		
		return product ? res.status(200).json(product) :
			res.status(404).json(err)
	} catch(err) {
		return res.status(404).json(err)
	}
}

exports.findForCurrentCategory = async (req, res) => {
	try {
		res.status(200).json( await Product.find( {
			$and: [
				{ active: true },
				{ $or: [ { "categories.main": req.query.curCategory }, { "categories.additional": req.query.curCategory } ] }
			]
		} ))
	} catch (err) {
		res.status(500).json(err)
	}
}

exports.findCurrentProduct = async (req, res) => {
	// console.log(req)
	try {
		res.status(200).json( await Product.findOne(
			{ active: true, link: req.params.current_prod }
		))
	} catch(err) {
		res.status(404).json(err)
	}
}

exports.updateCurrentProduct = async (req, res) => {
	try {
		Product.findOneAndUpdate(
			{ _id: req.params.current_prod },
			{ $set: req.body.params.product },
			{ new: true },
			(err, result) => {
				if(err){
					return res.status(500).json(err)
				}
				else{
					res.status(200).json(result)
				}
		
			}
		)
	}
	catch(err) {
		return res.status(404).json(err)
	}
}

exports.addAll = async (req, res) => {
	try {
		for(let prod in req.body.params.products) {
			Product.updateOne(
				{ vendorCode: req.body.params.products[prod].vendorCode },
				{ $set: req.body.params.products[prod] },
				{ upsert: true },
				(err, result) => {
					if(err){
						return res.status(500).json(err)
					}			
				}
			)
		}
		return res.status(200).json('ok')
	} catch(err) {
		res.status(500).json(err)
	}
}