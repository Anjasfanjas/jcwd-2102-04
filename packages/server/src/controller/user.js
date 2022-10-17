const { User, User_address } = require("../library/sequelize");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("../library/jwt");
const { json } = require("body-parser");
const user_address = require("../model/user_address");

const userController = {
    login: async (req, res) => {
        try {
            const { username, password, email } = req.body;

            const user = await User.findOne({
                where: {
                    [Op.or]: [{ username }, { email }],
                },
            });

            if (!user) {
                throw new Error("username/email/password not found gggg");
            }
            console.log(user);

            const checkPass = await bcrypt.compareSync(password, user.password);

            if (!checkPass) {
                throw new Error("username/email/password not found");
            }
            const token = generateToken({ id: user.id });

            delete user.dataValues.password;
            delete user.dataValues.createAt;
            delete user.dataValues.updateAt;

            console.log(user);

            res.status(200).json({
                message: "Login succed",
                result: { user, token },
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: err.toString(),
            });
        }
    },

    register: async (req, res) => {
        try {
            const {
                username,
                password,
                fullname,
                email,
                date_of_birth,
                role,
                phone_number,
            } = req.body;

            const findUser = await User.findOne({
                where: {
                    [Op.or]: [{ username }, { email }],
                },
            });

            const arrcek = await Token.findAll({
                where: {
                    email,
                },
            });
            console.log(arrcek);

            if (arrcek.length) {
                await Token.update({ valid: false }, { where: { email } });
            }

            console.log(findUser);

            const hashedPassword = bcrypt.hashSync(password, 5);

            const user = await User.create({
                username,
                password: hashedPassword,
                fullname,
                email,
                date_of_birth,
                role,
                phone_number,
            });

            const token = await generateToken({
                id: user.id,
                isEmailVerification: true,
            });
            const verToken = await SendVerification(
                user.id,
                email,
                username,
                fullname,
                phone_number
            );

            return res.status(200).json({
                message: "user has been created successfully",
                result: { user, token, verToken },
            });
        } catch (err) {
            console.log(err);
            console.log("a");
            return res.status(500).json({
                message: err.toString(),
            });
        }
    },

    getUserById: async (req, res) => {
        try {
            const { id } = req.params;

            const findUser = await User.findOne({
                where: {
                    id,
                },
            });

            return res.status(200).json({
                message: "fetched data user id :" + id,
                result: findUser,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: err.toString(),
            });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const findUser = await User.findAll({
                attributes: ["username", "email"],
                raw: true,
            });

            const username = findUser.map((user) => user.username);
            const email = findUser.map((user) => user.email);

            return res.status(200).json({
                message: "fetched all data users",
                result: { username, email },
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: err.toString(),
            });
        }
    },

    keepLogin: async (req, res) => {
        try {
            const { token } = req;
            const renewedToken = generateToken({
                id: token.id,
                password: token.password,
            });

            const findUser = await User.findByPk(token.id);

            delete findUser.dataValues.password;

            return res.status(200).json({
                message: "Renewed user token",
                result: {
                    user: findUser,
                    token: renewedToken,
                },
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: err.toString(),
            });
        }
    },

    editChangePassword: async (req, res) => {
        try {
            const { id } = req.params;
            const { password, oldpassword } = req.body;

            const oldpas = await User.findOne({
                where: {
                    id,
                },
            });
            const hashedPassword = bcrypt.hashSync(password, 5);
            const check = await bcrypt.compare(oldpassword, oldpas.password);
            console.log(check);
            if (!check) {
                console.log(oldpassword);

                throw new Error("old password is wrong");
            }
            await User.update(
                {
                    password: hashedPassword,
                },
                {
                    where: {
                        id,
                    },
                }
            );

            const user = await User.findByPk(id);

            return res.status(200).json({
                message: "Password has been changed",
                user: user,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: err.toString(),
            });
        }
    },

    //--------------- Forget Password --------------- //
    emailResetPassword: async (req, res) => {
        try {
            const { email } = req.body;

            const arrcek = await Token.findAll({
                where: {
                    email,
                },
            });

            if (arrcek.length) {
                await Token.update({ valid: false }, { where: { email } });
            }

            const resetToken = await SendResetPassword(email);

            return res.status(200).json({
                message: "Reset password link has been send",
                result: resetToken,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Error",
            });
        }
    },

    verifyResetToken: async (res, req) => {
        try {
            const { resetToken } = req.params;
            console.log(resetToken);

            const isTokenVerified = verifyToken(
                resetToken,
                process.env.JWT_SECRET_KEY
            );

            if (!isTokenVerified || !isTokenVerified.isEmailVerification) {
                throw new Error("token is invalid");
            }

            return res.status(200).json({
                message: "Token Reset Pass",
                success: true,
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: err.toString(),
                success: false,
            });
        }
    },

    verifyUser: async (req, res) => {
        try {
            const { vertoken } = req.params;

            const isTokenVerified = verifyToken(
                vertoken,
                process.env.JWT_SECRET_KEY
            );

            console.log(isTokenVerified.id);
            console.log(vertoken);

            if (!isTokenVerified || !isTokenVerified.isEmailVerification) {
                throw new Error("token is invalid");
            }
            await User.update(
                { is_verified: true },
                {
                    where: {
                        id: isTokenVerified.id,
                    },
                }
            );

            return res.status(200).json({
                message: "User is Verified",
                success: true,
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: err.toString(),
                success: false,
            });
        }
    },

    reVerifyLink: async (req, res) => {
        try {
            const { username, id, email, fullname, phone_number } = req.body;

            const arrcek = await Token.findAll({
                where: {
                    email,
                },
            });
            console.log(arrcek);

            if (arrcek.length) {
                await Token.update({ valid: false }, { where: { email } });
            }

            const token = await generateToken({
                id,
                isEmailVerification: true,
            });

            const verToken = await SendVerification(
                id,
                email,
                username,
                fullname,
                phone_number
            );

            return res.status(200).json({
                message: "new link has benn send to your email",
                result: {
                    token,
                    verToken,
                },
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: err.toString(),
            });
        }
    },

    resetPassword: async (req, res) => {
        try {
            const { resetToken } = req.params;
            const { password } = req.body;

            console.log(resetToken);
            const isTokenVerified = verifyToken(
                resetToken,
                process.env.JWT_SECRET_KEY
            );

            if (!isTokenVerified || !isTokenVerified.isEmailVerification) {
                throw new Error("token is invalid");
            }

            const hashedPassword = bcrypt.hashSync(password, 5);

            await User.update(
                { password: hashedPassword },
                { where: { email: isTokenVerified.email } }
            );

            return res.status(200).json({
                message: "Success change password",
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: err.toString(),
                success: false,
            });
        }
    },

    editProfile: async (req, res) => {
        try {
            const { id } = req.params;

            await User.update(
                {
                    ...req.body,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );
            const user = await User.findByPk(id);

            return res.status(200).json({
                message: "profile has been edited",
                user: user,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Your data is incorrect",
            });
        }
    },

    changePassword: async (res, req) => {
        try {
            const { id } = req.params;
            const { password } = req.body;

            const newPassowrd = bcrypt.hashSync(password, 5);

            const user = await User.findOne({
                where: {
                    id,
                },
            });

            const checkPassword = bcrypt.compareSync(password, user.password);
            if (checkPassword) {
                await User.update(
                    {
                        where: {
                            id,
                        },
                    },
                    {
                        password: newPassowrd,
                    }
                );
            } else {
                throw new Error("your password is incorrect");
            }

            res.status(202).json({
                message: "your password has been changed successfully",
            });
        } catch (error) {
            console.log(error);
            res.status(406).json({
                message: "error when changing the password",
            });
        }
    },

    addUserAddress: async (req, res) => {
        try {
            const {
                address_line,
                province,
                province_id,
                city,
                city_id,
                post_code,
                user_id,
                name,
                phone_number,
            } = req.body;

            await User_address.create({
                ...req.body,
                isDefault: 0
            });

            res.status(200).json({
                message: `new addres from user id : ${user_id} has neem added`,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: error.toString(),
            });
        }
    },

    getAddressByUser: async (req, res) => {
        try {
            const { user_id } = req.params;

            const result = await User_address.findAll({
                where: {
                    user_id,
                },
            });

            res.status(200).json({
                message: `addres from user id : ${user_id} has been fetched`,
                result: result,
            });
        } catch (error) {
            res.status(500).json({
                message: error.toString(),
            });
        }
    },

    getAddressById: async (req, res) => {
        try {
            const { id } = req.params;

            const result = await User_address.findAll({
                where: {
                    id,
                },
            });

            res.status(200).json({
                message: `addres from id : ${id} has been fetched`,
                result: result,
            });
        } catch (error) {
            res.status(500).json({
                message: error.toString(),
            });
        }
    },

    editUserAddress: async (req, res) => {
        try {
            const { user_id } = req.params;
            const {
                address_line,
                province,
                city,
                post_code,
                name,
                phone_number,
            } = req.body;

            await User_address.update(
                {
                    where: { user_id },
                },
                {
                    ...req.body,
                }
            );

            res.status(200).json({
                message: `user addres from user id : ${user_id} has been updated`,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: error.toString(),
            });
        }
    },

    deleteUserAddress: async (req, res) => {
        try {
            const { id } = req.params;

            await User_address.destroy({
                where: {
                    id,
                },
            });

            res.status(200).json({
                message: `address has been deleted`,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: error.toString(),
            });
        }
    },

    changeUserDefault: async (req, res) => {
        const { id, user_id } = req.body;

        try {
            await User_address.update(
                {
                    isDefault: false,
                },
                {
                    where: {
                        user_id,
                    },
                }
            );

            await User_address.update(
                {
                    isDefault: true,
                },
                {
                    where: {
                        id,
                    },
                }
            );

            res.status(200).json({
                message: `address has been updated`,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: error.toString(),
            });
        }
    },
};

module.exports = userController;
