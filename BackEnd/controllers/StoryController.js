import Story from "../models/StoryModel.js";
import Sequelize from "sequelize";

export const getStory = async (req, res) => {
    try {
        const { searchTerm, category, status } = req.query;

        let whereClause = {};

        if (searchTerm) {
            whereClause[Sequelize.Op.or] = [
                { title: { [Sequelize.Op.like]: `%${searchTerm}%` } },
                { author: { [Sequelize.Op.like]: `%${searchTerm}%` } },
            ];
        }

        if (category && category !== 'All') {
            whereClause.category = category;
        }

        if (status && status !== 'All') {
            whereClause.status = status;
        }

        const response = await Story.findAll({ where: whereClause });
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getStoryByID = async (req, res) => {
    try {
        const response = await Story.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!response) {
            return res.status(404).json({ error: "Story not found" });
        }

        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createStory = async (req, res) => {
    try {

        const createdStory = await Story.create(req.body);
        res.status(201).json({ msg: "Story Created", data: createdStory });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateStory = async (req, res) => {
    try {

        const updatedRows = await Story.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (updatedRows[0] === 0) {
            return res.status(404).json({ error: "Story not found" });
        }

        res.status(200).json({ msg: "Story Updated" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteStory = async (req, res) => {
    try {
        await Story.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Story Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}
