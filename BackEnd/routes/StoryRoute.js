import express from "express";
import { 
    getStory, 
    getStoryByID,
    createStory,
    updateStory,
    deleteStory
} from "../controllers/StoryController.js";

const router = express.Router();

router.get('/stories', getStory);
router.get('/stories/:id', getStoryByID);
router.post('/stories', createStory);
router.patch('/stories/:id', updateStory);
router.delete('/stories/:id', deleteStory);

export default router;