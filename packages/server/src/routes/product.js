const express = require("express");
const { productController } = require("../controller");
const router = express.Router();
const fileUploader = require("../library/uploader");

router.get("/", productController.getAllProduct);
router.get("/name", productController.getAllProductName);
router.get("/categories", productController.getAllCategories);
router.get("/:product_id", productController.getProductById);

router.post(
    "/",
    fileUploader({
        destinationFolder: process.env.PATH_IMAGE,
        fileType: "image",
        prefix: "product",
    }).single("image_url"),
    productController.addProduct
);

router.patch(
    "/:id",
    fileUploader({
        destinationFolder: process.env.PATH_IMAGE,
        fileType: "image",
        prefix: "product",
    }).single("image_url"),
    productController.editProduct
);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
