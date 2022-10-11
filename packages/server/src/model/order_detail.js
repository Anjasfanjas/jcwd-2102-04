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

        is_racikan: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        nama_racikan: {
            type: DataTypes.STRING
        }
    });

};

module.exports = order_detail;