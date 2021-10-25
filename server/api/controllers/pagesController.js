let Page = require('../models/page')

exports.findAll = async (req, res) => {
    try { 
        return res.status(200).json( await Page.find( {active: true} ) )
    } catch(err) {
        return res.status(404).json(err)
    }
}

exports.findByName = async (req, res) => {
    try {
        let page = await Page.findOne( {active: true, link: req.params.page_name} )

        return page ? res.status(200).json(page) :
            res.status(404).json(err)
    } catch(err) {
        return res.status(404).json(err)
    }
}