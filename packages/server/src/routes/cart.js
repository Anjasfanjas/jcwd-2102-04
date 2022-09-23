const express = require("express")
const { cartController } = require("../controller")
const router = express.Router()

router.post("/", cartController.addToCart)
router.get("/:user_id", cartController.getCart)
router.delete("/", cartController.deleteProductCart)

module.exports = router