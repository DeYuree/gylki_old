let mongoose = require('mongoose')

let ProductSchema = mongoose.Schema({
	vendorCode: String,
	title: String,
	link: String,
	actualPrice: Number,
	oldPrice: Number,
	active: Boolean,
	description: String,
	categories: {
		type: Object,
		main: String,
		additional: [String]
	},
	images: {
		type: Object,
		mainImage: {
			type: Object,
			src: String,
			label: String,
			alt: String
		},
		galleryImages: {
			type: Array
		}
	}
}, { collection: 'products' })

ProductSchema.method("toJSON", function() {
	const { __v, _id, ...object } = this.toObject()
	object.id = _id
	return object
})

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema)