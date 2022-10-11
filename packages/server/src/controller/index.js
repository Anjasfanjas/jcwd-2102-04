const userController = require("./user")
const productController = require("./product")
const avatarController= require("./avatar")
const cartController = require("./cart")
const prescriptionController = require("./prescription")
const paymentController = require("./payment")
const orderController = require("./order")
const stockController = require("./stock")

module.exports = {
    userController,
    productController,
    avatarController,
    cartController,
    prescriptionController,
    paymentController,
    orderController,
    stockController
}  