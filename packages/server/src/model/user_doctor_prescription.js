const { DataTypes } = require("sequelize");

const user_doctor_prescription = (sequelize) =>{
    return sequelize.define("user_doctor_prescription", {
        img_url : {
            type: DataTypes.STRING
        },

        is_confirm: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    })
}

module.exports = user_doctor_prescription;