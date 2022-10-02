const { DataTypes } = require("sequelize");

const order_detail = (sequelize) => {
    return sequelize.define("order_detail", {
        quantity: {
            type: DataTypes.INTEGER,
        },

        product_price: {
            type: DataTypes.DECIMAL,
        },

        total_price: { // total harga product X quantity
            type: DataTypes.INTEGER,
        },
    });

};

module.exports = order_detail;