const express = require("express")
const { orderController } = require("../controller")

const router = express.Router()

router.get("/user", orderController.getOrderByUser)
router.get("/admin/order", orderController.getAllOrder)
router.get("/admin/prescription", orderController.getAllPrescriptionOrder)
router.post("/detail", orderController.createOrderDetails)
router.post("/", orderController.createOrder)
router.get("/status", orderController.getOrderStatus)
router.patch("/update/status", orderController.changeOrderStatus)
router.patch("/update/:order_id", orderController.updateOrder)
router.get("/:order_id", orderController.getOrder)
router.get("/detail/:order_id", orderController.getOrderDetail)

module.exports = router