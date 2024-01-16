import express from "express";
import { 
    getChapter, 
    getChapterByID,
    createChapter,
    updateChapter,
    deleteChapter
} from "../controllers/ChapterController.js";

const router = express.Router();

router.get('/chapters', getChapter);
router.get('/chapters/:id', getChapterByID);
router.post('/chapters', createChapter);
router.patch('/chapters/:id', updateChapter);
router.delete('/chapters/:id', deleteChapter);

export default router;