const { DataTypes } = require("sequelize");

const user_address = (sequelize) =>{
    return sequelize.define("user_address", {
        name: {
            type: DataTypes.STRING,
        },

        phone_number: {
            type: DataTypes.STRING,
        },
        
        address_line: {
            type: DataTypes.STRING,
        },

        province: {
            type: DataTypes.STRING
        },

        province_id: {
            type: DataTypes.INTEGER
        },

        city: {
            type: DataTypes.STRING
        },

        city_id: {  
            type: DataTypes.INTEGER
        },
        
        post_code: {
            type : DataTypes.INTEGER
        },

        isDefault: {
            type: DataTypes.BOOLEAN
        }
    })
}

module.exports = user_address;