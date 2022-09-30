const { Order, Order_detail, Product, Product_stock, Product_img, Product_unit, Order_status, Cart } = require("../library/sequelize")
const moment = require("moment")


const orderController = {
    createOrder: async(req, res) => {
        const { user_id, user_address_id, order_price} =  req.body
        
        try {
            const result = await Order.create({
                no_invoice: `MBOX-${user_id}-${new Date ().getTime()}-${user_address_id}`,
                user_id,
                order_price,
                user_address_id,
                order_status_id: 1,
            })

            return res.status(200).json({
                message: `new order from user ${user_id} has been edded`,
                result: result
            });
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: error.toString()
            })
        }
    },

    createOrderDetails: async(req, res) => {
        const { quantity, product_price, product_id, order_id, user_id } = req.body

        try {
            console.log(req.body)
            const dataOrder = await Order_detail.create({
                ...req.body,
                total_price: parseInt(quantity) * parseInt(product_price),
            })

            console.log(user_id)

            await Cart.destroy({
                where: {
                    user_id
                }
            })
            console.log("this")
            
            return res.status(200).json({
                message: `new order_details from user ${user_id} has been edded`,
                result: dataOrder
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: error.toString()
            })
        }
    },

    getOrder: async (req, res) => {
        const { order_id } = req.params
        try {
            const cartData = await Order.findOne({
                where: {
                    id: order_id
                },
                include : [
                    Order_status
                ]
            })
    
            res.status(200).json({
                message: `data has been fetched`,
                result: cartData
            })
        } catch (error) {
            res.status(500).json({
                message: error.toString()
            })
        }
    },

    getOrderDetail: async (req, res) => {
        const { order_id } = req.params
        try {
            const cartData = await Order_detail.findAll({
                where: {
                    order_id
                },
                include: [
                    {   model : Product,
                        include: [
                            Product_img,
                            {
                                model : Product_stock,
                            },
                        ]
                        
                    },
                    
                ]
            })

            res.status(200).json({
                message: `data has been fetched`,
                result: cartData
            })
        } catch (error) {
            res.status(500).json({
                message: error.toString()
            })
        }
    },

    getOrderByUser: async (req, res) => {
        const { user_id, page, limit , search, status, sort, orderBy } = req.query
        try {
            const cartData = await Order.findAll({
                offset: (page - 1) * limit,
                limit: limit ? parseInt(limit) : undefined,
                where: search ? {
                    no_invoice: search
                } : {
                    user_id
                },
                include : [
                    {
                        model: Order_status, 
                        where: status ? {
                            status_name : status
                        } : {}
                    },
                    {
                        model : Order_detail, 
                        include: { 
                            model : Product, 
                            include: Product_img
                        }
                    },
                ],
                order: orderBy ?
                    orderBy == 'createdAt' && sort ? [[orderBy, sort]]
                    : (orderBy == 'order_price' && sort ? [[orderBy, sort]] : null )
                : [['createdAt', 'DESC']]

            })
    
            res.status(200).json({
                message: `data has been fetched`,
                result: cartData
            })
        } catch (error) {
            res.status(500).json({
                message: error.toString()
            })
        }
    },

    getOrderStatus: async(req, res) => {
        try {
            const result = await Order_status.findAll({})

            return res.status(200).json({
                message: `fatched all order_statuses`,
                result: result
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: error.toString()
            })
        }
    }, 

    getAllOrder: async (req, res) => {
        try {
            const result = await Order.findAll({
                include: { 
                    model: Order_detail,
                    include: {
                        model: Product,
                        include: [Product_img, Product_stock]
                    },
                }
            })

            return res.status(200).json({
                message: "fetched all data order",
                result: result
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: error.toString()
            })
        }
    }
}

module.exports = orderController