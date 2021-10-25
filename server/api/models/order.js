let mongoose = require('mongoose')

let orderSchema = mongoose.Schema({
    orderNumber: String,
    orderTime: String,
    status: Number,
    orderedItems: [String],
    orderFields: {
        type: Object,
        customerFullName: String,
        customerName: String,
        deliveryAddress: String,
        deliveryCity: String,
        phoneNumber: String,
        zipCode: String,
        comment: String
    },
}, { collection: 'orders' })

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema)
