const { User_doctor_prescription, User, Order_status } = require("../library/sequelize");


const prescriptionController = {
    addPrescription : async (req, res) =>{
        try {
            const { user_id } = req.params
            const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
            const filePath = process.env.PATH_PRESCRIPTION
            const { filename } = req.file

            const result = await User_doctor_prescription.create(
                {
                    img_url : `${uploadFileDomain}/${filePath}/${filename}`,
                    user_id   
                }
            )
            
            return res.status(200).json({
                message: "new prescriptions has been edded",
                result: result
            });
                
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: err.toString()
            })
        }
    },

    getAllUserPrescription: async (req,res) => {
        try {
            const result = await User_doctor_prescription.findAll({
                include: [User, Order_status]
            })
            
            return res.status(200).json({
                message: "new prescriptions has been edded",
                result: result
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: error.toString()
            })
        }
    }
}

module.exports = prescriptionController