const { Op } = require("sequelize")
const { Product_stock, Stock_histories } = require("../library/sequelize")



const stockController = {
    penjualan: async (req, res) => {
        const { product_id, main_unit_qty, converted_unit_qty, desc} = req.body
        console.log(req.body);
        try {
            const getProduct = await Product_stock.findOne(
                {
                    where: {
                        product_id,
                
                    }
                },
            )

            const stock_history = await Stock_histories.create(
                {
                    quantity : main_unit_qty ? main_unit_qty : converted_unit_qty,
                    type : main_unit_qty ? "main stock" : "converted stock",
                    desc,
                    product_id,
                },
                {
                    where: {
                        product_id
                    }
                },
            )
            
            const main_unit_stock = getProduct.dataValues.main_stock
            const converted_unit_stock = getProduct.dataValues.converted_stock
            // console.log(main_unit_stock)
            // console.log(converted_unit_stock)

            const result = await Product_stock.update( 
                {
                    main_stock:main_unit_qty ? main_unit_stock - main_unit_qty : main_unit_stock, 
                    converted_stock: converted_unit_qty ? converted_unit_stock - converted_unit_qty : converted_unit_stock
                },
                {
                    where: {
                        product_id
                    }
                },
            )

            

            return res.status(200).json({
                message: `product ${product_id} has been updated`,
                result: {result, stock_history}
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: error.toString()
            })
        }
    }
}

module.exports = stockController