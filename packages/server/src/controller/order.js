const { Order, Order_detail, Product, Product_stock, Product_img, Product_unit, Order_status, Cart, User_doctor_prescription, User, User_address } = require("../library/sequelize")
const moment = require("moment")
const { Op } = require("sequelize")


const orderController = {
    createOrder: async(req, res) => {
        const { user_id, user_address_id, order_price, shipping_price, user_prescription_id} =  req.body
        
        try {
            const result = await Order.create({
                no_invoice: `MBOX-${user_id}-${new Date ().getTime()}-${user_address_id}`,
                user_id,
                shipping_price,
                order_price,
                user_address_id,
                order_status_id: 1,
                user_prescription_id
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
        const { quantity, product_price, product_id, order_id, user_id, is_racikan, nama_racikan } = req.body

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

    updateOrder: async (req, res) => {
        const { order_id } = req.params
        const { shipping_price, order_price } = req.body
        try {
            await Order.update(
                {
                    shipping_price,
                    order_price,
                },
                {
                    where: {
                        id : order_id
                    }
                },
            )

            res.status(200).json({
                message: `data has been update`,
            })
        } catch (error) {
            res.status(500).json({
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
        const { user_id, page, limit , search, status, sort, orderBy, dateFrom, dateTo } = req.query
        console.log(req.query)
        try {
            const cartData = await Order.findAll({
                offset: (page - 1) * limit,
                limit: limit ? parseInt(limit) : undefined,
                where: search && dateFrom && dateTo ? {
                    no_invoice: search,
                    user_id,
                    createdAt: {[Op.between] : [dateFrom, dateTo]}
                } : dateFrom && dateTo ?  {
                    user_id,
                    createdAt: {[Op.between] : [dateFrom, dateTo]}
                } : { 
                    user_id,
                    // no_invoice: search
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
        const {page, limit , search, status, sort, orderBy, dateFrom, dateTo  } = req.query
        try {
            const result = await Order.findAll({
                offset: (page - 1) * limit,
                limit: limit ? parseInt(limit) : undefined,
                where: search && dateFrom && dateTo ? {
                    no_invoice: search,
                    createdAt: {[Op.between] : [dateFrom, dateTo]}
                } : dateFrom && dateTo ?  {
                    createdAt: {[Op.between] : [dateFrom, dateTo]}
                } : search ? {
                    no_invoice: search,
                } : {},
                include: [ 
                    { 
                        model : User_doctor_prescription
                    },
                    {
                        model: Order_status,
                        where: status ? {
                            status_name : status
                        } : {}
                    }, 
                    {
                        model: Order_detail,
                        include: {
                            model: Product,
                            include: [Product_img, Product_stock]
                        },
                    }
                ],
                order: orderBy ?
                    orderBy == 'createdAt' && sort ? [[orderBy, sort]]
                    : (orderBy == 'order_price' && sort ? [[orderBy, sort]] : null )
                : [['createdAt', 'DESC']]
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
    },

    getAllPrescriptionOrder: async (req, res) => {
        const {page, limit , search, status, sort, orderBy } = req.query
        try {
            const result = await Order.findAll({
                offset: (page - 1) * limit,
                limit: limit ? parseInt(limit) : undefined,
                where: search ? {
                    no_invoice: search,
                    user_prescription_id: {
                        [Op.ne]: null
                    }
                } : {user_prescription_id: {
                    [Op.ne]: null
                }},
                include: [
                    {
                        model: Order_status,
                        where: status ? {
                            status_name : status
                        } : {}
                    }, 
                    {
                        model: Order_detail,
                        include: {
                            model: Product,
                            include: [Product_img, Product_stock]
                        },
                    },
                    {
                        model : User_doctor_prescription,
                        include: {
                            model: User
                        }
                    }
                ]
            })

            return res.status(200).json({
                message: "fetched all data prescription order",
                result: result
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: error.toString()
            })
        }
    },

    changeOrderStatus: async(req, res) => {
        const { order_id, order_status_id } = req.body
        try { 
            await Order.update(
                {
                    order_status_id : order_status_id
                }, 
                {
                    where: {
                        id: order_id
                    }
                }
            )

            return res.status(200).json({
                message: `the order ${order_id}'s status has been updated`,
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: error.toString()
            })
        }
    }
}

module.exports = orderController