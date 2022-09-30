const sequelize = require("sequelize")
const { Op } = require("sequelize")
const { Cart, Product, Product_stock, Product_img, Product_categories } = require("../library/sequelize")


const cartController = {
    addToCart: async (req, res) => {
        const { quantity, product_price, user_id, product_id } = req.body
        console.log(req.body)
        
        try {
            const allProductCart =  await Cart.findOne({
                where : {
                    [Op.and] : { 
                        product_id: product_id,
                        user_id: user_id
                    }
                }
            })
            
            if (allProductCart){
                let updateQty = parseInt(quantity) + parseInt(allProductCart.dataValues.quantity)

                const cartData =  await Cart.update(
                    {
                        quantity: updateQty
                    },
                    {
                        where : {
                            [Op.and] : {
                                product_id: product_id,
                                user_id: user_id
                            }
                        },
                    }
                )                

                res.status(200).json({
                    message: `product ${product_id} quantity has been edded in cart user ${cartData.user_id}`,
                })

            } else {
                const cartData = await Cart.create({
                    ...req.body,
                    price_total : (quantity * product_price)
                })

                res.status(200).json({
                    message: `new product has been added to cart ${cartData.user_id}`,
                    result: cartData
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.toString()
            })
        }
    },

    getCart: async (req, res) => {
        const { user_id } = req.params
        try {
            const cartData = await Cart.findAll({
                where: {
                    user_id
                },
                include: [
                    {   model : Product,
                        include: [
                            Product_stock,
                            Product_img,
                        ]
                        
                    },
                    
                ]
            })

            res.status(200).json({
                message: `fetch all product from user ${user_id}`,
                result: cartData
            })
        } catch (error) {
            res.status(500).json({
                message: error.toString()
            })
        }
    },

    deleteProductCart: async (req, res) =>{
        const { product_id, user_id } = req.query
        console.log(req.query)
        try {
            const cartData = await Cart.destroy({
                where: product_id ? {
                    product_id,
                    user_id
                } : { user_id 
                }
            })
    
            res.status(200).json({
                message: `product ${product_id} has been deleted from cart}`,
            })   
        } catch (error) {
            res.status(500).json({
                message: error.toString()
            })
        }
    },

    deletCartUser: async (req, res) =>{
        const { user_id } = req.body
        try {
            const cartData = await Cart.destroy({
                where: {
                    ...req.body
                }
            })
            
            res.status(200).json({
                message: `cart form user ${user_id} has been deleted`,
            })   
        } catch (error) {
            res.status(500).json({
                message: error.toString()
            })
        }
    },

    addQuantity: async (req, res) => {
        const { cart_id, quantity, user_id } = req.query
        try {
            // const getProduct = await Cart.findOne({
            //     where: { 
            //         id: cart_id
            //     }
            // })

            // let updateQty = parseInt(quantity) + parseInt(getProduct.dataValues.quantity)
            await Cart.update(
                {
                    quantity: quantity
                },
                {
                    where: {
                        id : cart_id
                    }
                }
            )

            res.status(200).json({
                message: `product ${cart_id} form user's cart ${user_id} has been edited`,
            })  
        } catch (error) {
            res.status(500).json({
                message: error.toString()
            })
        }
    }

}

module.exports = cartController