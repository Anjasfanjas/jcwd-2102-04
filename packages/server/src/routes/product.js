const express = require("express");
const { productController } = require("../controller");
const router = express.Router();

router.get('/', productController.getAllProduct)
router.get('/name', productController.getAllProductName)
router.get('/categories', productController.getAllCategories)
router.get('/:product_id', productController.getProductById)

module.exports = router