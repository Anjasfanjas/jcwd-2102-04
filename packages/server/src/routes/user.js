const express = require("express");
const { userController } = require("../controller");
const { authorizedLoggedInUser } = require("../middleware/authMiddleware");
const router = express.Router();


router.patch("/:id", userController.editProfile);
router.post(`/login`, userController.login);
router.get("/refresh-token", authorizedLoggedInUser, userController.keepLogin);
router.get("/:id", userController.getUserById)
router.get("/", userController.getAllUsers)

router.patch('/address/update', userController.changeUserDefault)
router.post('/address', userController.addUserAddress)
router.get('/address/:user_id', userController.getAddressByUser)
router.get('/address/byid/:id', userController.getAddressById)
router.patch('/address/:id', userController.editUserAddress)
router.delete('/address/:id', userController.deleteUserAddress)

// bang GIO
router.post("/sendResetPassword", userController.emailResetPassword);
router.patch("/changePassword/:resetToken", userController.resetPassword);
router.patch("/editchangePassword/:id", userController.editChangePassword);

router.post("/register", userController.register);
router.patch("/verify/:vertoken", userController.verifyUser);
router.get("/refresh-token", authorizedLoggedInUser, userController.keepLogin);
router.post("/new-link", userController.reVerifyLink);

module.exports = router
