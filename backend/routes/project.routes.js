import express from 'express';
import { createProject, joinProject, getUserProjects} from '../controllers/project.controller.js';
import { protectRoute } from '../middlewares/protectRoute.middleware.js';

const router = express.Router();

router.post('/create', protectRoute, createProject);
router.post('/join', protectRoute, joinProject);
router.get('/my', protectRoute, getUserProjects);

export default router;
