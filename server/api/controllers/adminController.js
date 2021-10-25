let ProductsProps = require('../models/admin/productsProps')

const http = require('http')
const fetch = require('node-fetch')

const xml2js = require('xml2js')
var parser = new xml2js.Parser();

exports.findAll = async (req, res) => {
    try {
        let prodProps = await ProductsProps.find().sort({title: 'asc'})
        
        return prodProps ? res.status(200).json(prodProps) :
            res.status(404).json(err)
    } catch(err) {
        res.status(404).json(err)
    }
}

exports.gotoUrl = async (req, res) => {
    try {
        await fetch(req.query.url_path)
            .then( data => {
                return data.text()
            })
            .then( fetchRes => {
                parser.parseString(fetchRes, function (err, result) {
                    return res.status(200).json(result)
                })
            })
            .catch(err => { 
                // res.status(500).json(err) 
                console.log(err)
            })

    } catch(err){
        res.status(404).json(err)
    }
}