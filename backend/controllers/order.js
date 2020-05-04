const {Order, ProductCart} = require('../models/order');

exports.getOrderById = (req,res, next, id) =>{
    Order.findById(id).
    populate("products.product", "name price")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                message: 'Order not found'
            })
        }
        req.order = order;
        next();
    })
}

exports.getOrder = (req,res) =>{
    return res.json(req.order);
}

exports.createOrder = (req, res) =>{
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err,order)=>{
        if(err){
            return res.status(400).json({
                error:  `Failed to create Order :${err.errMsg}`
            })
        }
        res.json(order);

    })
}


exports.getAllOrders = (req, res) =>{
    Order.find().
    populate('user', '_id name')
    .exec((err, orders)=>{
        if(err){
            return res.status(400).json({
                error : `Failed to fetch all orders: ${err.errMsg}`
            })
        }
        res.json(orders);
    })
}

exports.getOrderStatus = (req, res) =>{
    res.json(Order.schema.path('status').enumValues);
}

exports.updateOrderStatus = (req, res) =>{
    Order.update(
        {_id: req.body.orderId},
        {$set : { status : req.body.status}},
        (err, udpatedOrder) =>{
            if(err){
                return res.status(400).json({
                    error: `Failed to udpate ${err.errMsg}`
                })
            }
            res.json(udpatedOrder);
        }
    )
}