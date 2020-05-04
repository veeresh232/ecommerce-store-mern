const mongoose= require('mongoose');

const {ObjectId} = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: 'Product'
    },
    name: String,
    count: Number,
    price: Number
})

const orderSchema = new mongoose.Schema({
    products: [ProductCartSchema],
    transaction_id: {},
    amount: Number,
    address: String,
    status : {
        type: String,
        default: 'Received',
        enum : ['Cancelled', 'Delivered', 'Shipped', 'Processing', 'Received']
    },
    updated: Date,
    user:{
        type: ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

const ProductCart = mongoose.model('ProductCart',ProductCartSchema);

const Order = mongoose.model('Order', orderSchema);

module.exports= {ProductCart,Order};