const express = require("express")
const router = express.Router()

const prescriptionController = require("../controller/prescription")
const fileUploader = require("../library/uploader")


router.get("/", prescriptionController.getAllUserPrescription)
router.post(
    "/:user_id",
    fileUploader({
        destinationFolder: process.env.PATH_PRESCRIPTION,
        fileType: "image",
        preflix: "Prescription",
    }).single("prescription"),
    prescriptionController.addPrescription
)



module.exports = router