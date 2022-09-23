const express = require("express")
const router = express.Router()

const { paymentController } = require("../controller")
const fileUploader = require("../library/uploader")

router.post(
    "/:user_id",
    fileUploader({
        destinationFolder: process.env.PATH_PAYMENT,
        fileType: "image",
        preflix: "POST",
    }).single("payment_reciep"),
    paymentController.newPayment
)

module.exports = router