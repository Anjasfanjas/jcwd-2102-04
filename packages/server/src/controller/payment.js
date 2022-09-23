const { Payment } = require("../library/sequelize");


const paymentController = {
    newPayment : async (req, res) =>{
        try {
            const { user_id } = req.params
            const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
            const filePath = process.env.PATH_PAYMENT
            const { filename } = req.file

            await Payment.create(
                {
                    payment_reciep_url : `${uploadFileDomain}/${filePath}/${filename}`,
                    user_id
                },
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
    }
}

module.exports = paymentController