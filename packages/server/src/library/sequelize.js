const { Sequelize } = require("sequelize")
const database_config = require("../config/database")

const sequelize = new Sequelize({
    username: database_config.MYSQL_USERNAME,
    password: database_config.MYSQL_PASSWORD,
    database: database_config.MYSQL_DB_NAME,
    port: database_config.MYSQL_PORT,
    dialect: "mysql"
})

//pembuatan models MYSQL
const User = require("../model/user")(sequelize)
const User_address = require("../model/user_address")(sequelize)
const User_doctor_prescription = require("../model/user_doctor_prescription")(sequelize)
const Cart = require("../model/cart")(sequelize)
const Order = require("../model/order")(sequelize)
const Order_detail = require("../model/order_detail")(sequelize)
const Order_status = require("../model/order_status")(sequelize)
const Payment = require("../model/payment")(sequelize)
const Product = require("../model/product")(sequelize)
const Product_stock = require("../model/product_stock")(sequelize)
const Product_categories = require("../model/product_category")(sequelize)
const Categories = require("../model/categories")(sequelize)
const Product_description = require("../model/product_description")(sequelize)
const Product_img = require("../model/product_img")(sequelize)
const Product_stock_reserved = require("../model/product_stock_reserved")(sequelize)
const Stock_histories = require("../model/stock_histories")(sequelize)
const Token = require("../model/token")(sequelize)

//pembuatan relational database
// 1 : M
User.hasMany(Token, {foreignKey: "user_id"})
Token.belongsTo(User, {foreignKey: "user_id"})

User.hasMany(Payment, {foreignKey: "user_id"})
Payment.belongsTo(User, {foreignKey: "user_id"})

User.hasMany(User_address, {foreignKey: "user_id"})
User_address.belongsTo(User, {foreignKey: "user_id"})

User.hasMany(User_doctor_prescription, {foreignKey: "user_id"})
User_doctor_prescription.belongsTo(User, {foreignKey: "user_id"})

User.hasMany(Cart, {foreignKey: "user_id"})
Cart.belongsTo(User, {foreignKey: "user_id"})

User.hasMany(Order, {foreignKey: "user_id"})
Order.belongsTo(User, {foreignKey: "user_id"})

Product.hasMany(Order_detail, {foreignKey: "product_id"})
Order_detail.belongsTo(Product, {foreignKey: "product_id"})

User_address.hasMany(Order, {foreignKey: "user_address_id"})
Order.belongsTo(Order, {foreignKey: "user_address_id"})

Order.hasMany(Order_detail, {foreignKey: "order_id"})
Order_detail.belongsTo(Order, {foreignKey: "order_id"})

User.hasMany(Order_detail, {foreignKey: "user_id"})
Order_detail.belongsTo(User, {foreignKey: "user_id"})

Order_status.hasMany(Order, {foreignKey: "order_status_id"})
Order.belongsTo(Order_status, {foreignKey: "order_status_id"})

User_doctor_prescription.hasMany(Order, {foreignKey: "user_prescription_id"})
Order.belongsTo(User_doctor_prescription, {foreignKey: "user_prescription_id"})

Order.hasMany(Payment, {foreignKey: "order_id"}) 
Payment.belongsTo(Order, {foreignKey: "order_id"})

Product.hasMany(Product_img, {foreignKey: "product_id"})
Product_img.belongsTo(Product, {foreignKey: "product_id"})

Product.hasOne(Product_description, {foreignKey: "product_id"})
Product_description.belongsTo(Product_description, {foreignKey: "product_id"})

Product.hasMany(Product_stock, {foreignKey: "product_id"})
Product_stock.belongsTo(Product, {foreignKey: "product_id"})

Product.hasMany(Stock_histories, {foreignKey: "product_id"})
Stock_histories.belongsTo(Product, {foreignKey: "product_id"})

Product.hasMany(Cart, {foreignKey: "product_id"})
Cart.belongsTo(Product, {foreignKey: "product_id"})

//M : M
Product.hasMany(Product_categories, {foreignKey: "product_id"})
Product_categories.belongsTo(Product, {foreignKey: "product_id"})
Categories.hasMany(Product_categories, {foreignKey: "categories_id"})
Product_categories.belongsTo(Categories, {foreignKey: "categories_id"})

module.exports ={
    sequelize,
    User,
    User_address,
    User_doctor_prescription,
    Product,
    Product_categories,
    Categories,
    Product_description,
    Product_img,
    Product_stock,
    Product_stock,
    Product_stock_reserved,
    Stock_histories,
    Order,
    Order_detail,
    Order_status,
    Payment,
    Cart,
    Token
}