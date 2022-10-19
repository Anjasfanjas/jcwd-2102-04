const express = require("express");
const { categoriesController } = require("../controller");
const router = express.Router();
const fileUploader = require("../library/uploader");

router.get("/", categoriesController.getAllCat);
router.get("/:id", categoriesController.getCatByUser);
router.post(
    "/",
    fileUploader({
        destinationFolder: process.env.PATH_POST,
        fileType: "image",
        prefix: "category",
    }).single("img_url"),
    categoriesController.addCat
);
router.patch(
    "/:id",
    fileUploader({
        destinationFolder: process.env.PATH_POST,
        fileType: "image",
        prefix: "category",
    }).single("img_url"),
    categoriesController.editCat
);
router.delete("/:id", categoriesController.deleteCat);

module.exports = router;
