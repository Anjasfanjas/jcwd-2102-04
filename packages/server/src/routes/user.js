const express = require("express");
const { userController } = require("../controller");
const { authorizedLoggedInUser } = require("../middleware/authMiddleware");
const router = express.Router();


router.patch("/:id", userController.editProfile);
router.post(`/login`, userController.login);
router.get("/refresh-token", authorizedLoggedInUser, userController.keepLogin);
router.get("/:id", userController.getUserById)
router.get("/", userController.getAllUsers)

router.post('/address', userController.addUserAddress)
router.get('/address/:user_id', userController.getAddressByUser)
router.patch('/address/:user_id', userController.editUserAddress)
router.delete('/address/:id', userController.deleteUserAddress)

module.exports = router
