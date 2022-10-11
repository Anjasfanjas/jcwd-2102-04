const express = require("express")
const router = express.Router()

const { paymentController } = require("../controller")
const fileUploader = require("../library/uploader")

router.get("/:order_id", paymentController.getPaymentByOrderId)
router.post(
    "/",
    fileUploader({
        destinationFolder: process.env.PATH_PAYMENT,
        fileType: "image",
        preflix: "Payment",
    }).single("Payment"),
    paymentController.newPayment
)

module.exports = router