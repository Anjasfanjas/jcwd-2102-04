const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require("body-parser")
const { userRouter, productRouter, avatarRouter, cartRouter, prescriptionRouter, paymentRouter, orderRouter, stockRouter } = require('./routes')


dotenv.config();
const PORT = process.env.PORT
const { sequelize } = require("./library/sequelize");
// sequelize.sync({alter: true})


const app = express()
app.use(cors())
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/avatar", avatarRouter)
app.use("/prescription", prescriptionRouter)
app.use("/payment", paymentRouter)
app.use("/cart", cartRouter)
app.use("/order", orderRouter)
app.use("/stock", stockRouter)

app.use("/avatar_images", express.static(`${__dirname}/public/avatar_images`));
app.use("/prescription_images", express.static(`${__dirname}/public/prescription_images`));
app.use("/payment_images", express.static(`${__dirname}/public/payment_images`));
app.use("/product_images", express.static(`${__dirname}/public/product_images`));
app.use("/categories_images", express.static(`${__dirname}/public/categories_images`));

app.get("/", (req, res) => {
    res.send("API is Running")
})

app.listen(PORT, () =>{
    console.log("server is running in port : " + PORT)
})