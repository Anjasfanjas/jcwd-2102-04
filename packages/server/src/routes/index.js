const userRouter = require('./user')
const productRouter = require("./product")
const avatarRouter = require("./avatar")
const cartRouter = require("./cart")
const prescriptionRouter = require("./prescription")
const paymentRouter = require("./payment")
const orderRouter = require("./order")

module.exports = {
    userRouter,
    productRouter,
    avatarRouter,
    cartRouter,
    prescriptionRouter,
    paymentRouter,
    orderRouter,
}