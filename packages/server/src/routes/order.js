const express = require("express")
const { orderController } = require("../controller")

const router = express.Router()

router.get("/user", orderController.getOrderByUser)
router.get("/admin/order", orderController.getAllOrder)
router.post("/detail", orderController.createOrderDetails)
router.post("/", orderController.createOrder)
router.get("/status", orderController.getOrderStatus)
router.get("/:order_id", orderController.getOrder)
router.get("/detail/:order_id", orderController.getOrderDetail)

module.exports = router