const express = require("express");
const { stockController } = require("../controller");
const router = express.Router();

router.patch('/penjualan', stockController.penjualan)

module.exports = router