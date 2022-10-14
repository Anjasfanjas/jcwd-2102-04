const { User, Categories } = require("../library/sequelize");
const categoryController = {
    getAllCat: async (req, res) => {
        try {
            const findCat = await Categories.findAll({
                limit: 5,
                offset: 0,
                // include: [User],
            });

            return res.status(200).json({
                message: "fetched all categories",
                result: findCat,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: err.toString(),
            });
        }
    },

    getCatByUser: async (req, res) => {
        try {
            const { id } = req.params;

            const findUserCat = await Post.findAll({
                where: {
                    id,
                },

                order: [["createdAt", "DESC"]],
            });

            return res.status(200).json({
                message: `fatched all the post from user_id = ${user_id}`,
                result: findUserCat,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: err.toString(),
            });
        }
    },

    addCat: async (req, res) => {
        try {
            const { category } = req.body;
            const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
            const filePath = process.env.PATH_POST;
            const { filename } = req.file;

            await Categories.create({
                img_url: `${uploadFileDomain}/${filePath}/${filename}`,
                category,
            });

            return res.status(200).json({
                message: "new category added",
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: err.toString(),
            });
        }
    },

    deleteCat: async (req, res) => {
        try {
            const { id } = req.params;

            await Categories.destroy({
                where: {
                    id,
                },
            });

            return res.status(500).json({
                message: "categories has been deleted",
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: err.toString(),
            });
        }
    },

    editCat: async (req, res) => {
        try {
            const { id } = req.params;

            const { category, img_url } = req.body;
            const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
            const filePath = process.env.PATH_POST;
            const { filename } = req.file;

            await Categories.update(
                {
                    category,
                    img_url: `${uploadFileDomain}/${filePath}/${filename}`,
                },
                {
                    where: {
                        id,
                    },
                }
            );

            return res.status(200).json({
                message: "categories edited succesfully",
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: err.toString(),
            });
        }
    },
};

module.exports = categoryController;
