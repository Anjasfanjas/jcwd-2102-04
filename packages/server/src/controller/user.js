const { User, User_address,  } = require('../library/sequelize')
const { Op } = require("sequelize");
const bcrypt = require('bcrypt')
const { generateToken, verifyToken } = require("../library/jwt");
const { json } = require('body-parser');
const user_address = require('../model/user_address');

const userController = {
    login: async (req, res) =>{
        try{
            const { username, password, email } = req.body;

            const user = await User.findOne({
                where: {
                    [Op.or]: [{username}, {email}],
                },
            })

            if(!user){
                throw new Error("username/email/password not found gggg");
            }
            console.log(user )

            const checkPass = await bcrypt.compareSync(password, user.password);

            if(!checkPass){
                throw new Error("username/email/password not found")
            }
            const token = generateToken({ id: user.id });

            delete user.dataValues.password;
            delete user.dataValues.createAt;
            delete user.dataValues.updateAt;

            console.log(user)

            res.status(200).json({
                message : "Login succed",
                result : { user, token },
            })

        } catch (err){
            console.log(err)
            res.status(400).json({
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
                }
            })
            
            return res.status(200).json({
                message: "fetched data user id :" + id,
                result : findUser
            });

        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: err.toString(),
            });
        }
    },

    getAllUsers: async (req, res) =>{
        try {

            const findUser = await User.findAll({
                attributes: ['username', 'email'],
                raw:true
            })

            const username = findUser.map(user => user.username);
            const email = findUser.map(user => user.email);
            
            return res.status(200).json({
                message: "fetched all data users",
                result : {username, email}
            });

        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: err.toString(),
            });
        }
    },

    keepLogin: async (req,res) =>{
        try {
            const { token } = req;
            const renewedToken = generateToken({ id: token.id, password: token.password });
      
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

    editProfile: async (req,res) => {
        try {
            const { id } = req.params

            await User.update(
                {
                    ...req.body
                },
                {
                    where: {
                        id: id
                    }
                }
            )
            const user = await User.findByPk(id)

            return res.status(200).json({
                message: "profile has been edited",
                user: user
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Your data is incorrect'
            })
        }
    },

    changePassword: async (res,req) => {
        try {
            const { id } = req.params
            const { password } = req.body

            const newPassowrd = bcrypt.hashSync(password, 5)
            
            const user = await User.findOne(
                {
                    where: {
                        id
                    }
                }
            )

            const checkPassword = bcrypt.compareSync(password, user.password)
            if(checkPassword){
                await User.update(
                    {
                        where: {
                            id
                        }
                    },
                    {
                        password: newPassowrd
                    }
                )
            } else {
                throw new Error('your password is incorrect')
            }

            res.status(202).json({
                message: "your password has been changed successfully"
            })

        } catch (error) {
            console.log(error)
            res.status(406).json({
                message: 'error when changing the password'
            })
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
                phone_number 
            } = req.body

            await User_address.create({
                ...req.body
            })

            res.status(200).json({
                message: `new addres from user id : ${user_id} has neem added`
            })

        } catch (error){
            console.log(error)
            res.status(500).json({
                message: error.toString()
            })
        }
    },

    getAddressByUser: async (req, res) => {
        try {
            const { user_id } = req.params
            
            const result = await User_address.findAll(
                {
                    where : {
                        user_id
                    }
                }
            )

            res.status(200).json({
                message: `addres from user id : ${user_id} has been fetched`,
                result: result,
            })
        } catch (error) {
            res.status(500).json({
                message: error.toString()
            })
        }
    },

    getAddressById: async (req, res) => {
        try {
            const { id } = req.params
            
            const result = await User_address.findAll(
                {
                    where : {
                        id
                    }
                }
            )

            res.status(200).json({
                message: `addres from id : ${id} has been fetched`,
                result: result,
            })
        } catch (error) {
            res.status(500).json({
                message: error.toString()
            })
        }
    },

    editUserAddress : async (req, res) => {
        try {
            const { user_id } = req.params
            const { 
                address_line, 
                province, city, 
                post_code,
                name, 
                phone_number 
            } = req.body

            await User_address.update(
                {
                   where: { user_id }
                }, 
                {
                    ...req.body
                }
            )

            res.status(200).json({
                message: `user addres from user id : ${user_id} has been updated`,
            })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: error.toString()
            })
        }

    },

    deleteUserAddress: async (req, res) => {
        try {
            const { id } = req.params

            await User_address.destroy({
                where : {
                    id
                }
            })

            res.status(200).json({
                message: `address has been deleted`
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: error.toString()
            })
        }
    },

    changeUserDefault: async(req, res) => {
        const { id, user_id } = req.body

        try {
            await User_address.update(
                {
                    isDefault: false
                },
                {
                    where : {
                        user_id
                    }
                }
            )

            await User_address.update(
                {
                    isDefault : true
                }, {
                    where: {
                        id
                    }
                }
            )

            res.status(200).json({
                message: `address has been updated`
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: error.toString()
            })
        }
    }
}

module.exports = userController