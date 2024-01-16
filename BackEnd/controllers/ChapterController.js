import Chapter from "../models/ChapterModel.js";


export const getChapter = async (req, res) => {
    try {
        const response = await Chapter.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        
    }
}

export const getChapterByID = async (req, res) => {
    try {
        const response = await Chapter.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!response) {
            return res.status(404).json({ error: "Chapter not found" });
        }

        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createChapter = async (req, res) => {
    try {

        const createdChapter = await Chapter.create(req.body);
        res.status(201).json({ msg: "Chapter Created", data: createdChapter });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateChapter = async (req, res) => {
    try {

        const updatedRows = await Chapter.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (updatedRows[0] === 0) {
            return res.status(404).json({ error: "Chapter not found" });
        }

        res.status(200).json({ msg: "Chapter Updated" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteChapter = async (req, res) => {
    try {
        await Chapter.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Chapter Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}
