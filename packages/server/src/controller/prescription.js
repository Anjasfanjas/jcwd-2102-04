const { User_doctor_prescription } = require("../library/sequelize");


const prescriptionController = {
    addPrescription : async (req, res) =>{
        try {
            const { user_id } = req.params
            const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
            const filePath = process.env.PATH_PRESCRIPTION
            const { filename } = req.file

            await User_doctor_prescription.create(
                {
                    img_url : `${uploadFileDomain}/${filePath}/${filename}`,
                    user_id   
                }
            )
            
            return res.status(200).json({
                message: "new prescriptions has been edded",
            });
                
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: err.toString()
            })
        }
    }
}

module.exports = prescriptionController