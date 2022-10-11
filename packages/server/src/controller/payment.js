const { Payment, Order } = require("../library/sequelize");


const paymentController = {
    newPayment : async (req, res) =>{
        try {
            const { user_id, order_id } = req.query
            const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
            const filePath = process.env.PATH_PAYMENT
            const { filename } = req.file

            await Payment.create(
                {
                    payment_reciep_url : `${uploadFileDomain}/${filePath}/${filename}`,
                    user_id,
                    order_id
                },
            )

            await Order.update(
                {
                    order_status_id: 2 
                },
                {
                    where: {
                        id: order_id
                    }
                }
            )
            
            return res.status(200).json({
                message: "new payment reciep has been edded",
            });
                
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: err.toString()
            })
        }
    },

    getPaymentByOrderId: async (req, res) => {
        const { order_id } = req.params
        try {
            const result = await Payment.findOne({
                where: {
                    order_id
                }
            })    

            return res.status(200).json({
                message: "fetched",
                result : result
            });
        } catch (error) {
            console.log(err)
            return res.status(500).json({
                message: err.toString()
            })
        }
    }
}

module.exports = paymentController