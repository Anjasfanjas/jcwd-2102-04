const { DataTypes } = require("sequelize");

const product_stock = (sequelize) => {
    return sequelize.define("product_stock", {
        main_unit: {
            type: DataTypes.STRING,
        },

        main_stock: {
            type: DataTypes.INTEGER,
        },
        
        converted_unit: {
            type: DataTypes.STRING
        },
        
        converted_stock: {
            type: DataTypes.INTEGER,
        },
        
        purchase_price: {
            type: DataTypes.INTEGER,
        },

        sell_price: {
            type: DataTypes.INTEGER,
        },

        converted_sell_price: {
            type: DataTypes.INTEGER
        },
        
        total_item_sold: {
            type: DataTypes.INTEGER,
        },
    });

};

module.exports = product_stock;