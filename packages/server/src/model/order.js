const { DataTypes } = require("sequelize");

const order = (sequelize) => {
    return sequelize.define("order", {
        no_invoice: {
            type: DataTypes.STRING,
            allowNull: false
        },

        shipping_price: {
            type: DataTypes.INTEGER,
        },

        order_price: { // total harga dengan tambahan shipping
            type: DataTypes.DECIMAL,
        },
    });

};

module.exports = order;