import express from "express"
import { protectRoute } from "../middlewares/protectRoute.middleware.js"
import { createTask, getProjectTasks,
     updateTask, deleteTask, moveTaskToCategory } from "../controllers/tasks.controller.js";

const router = express.Router()

router.post('/create/:projectId', protectRoute, createTask);
router.get('/project/:projectId', protectRoute, getProjectTasks);
router.put('/update/:taskId', protectRoute, updateTask);
router.delete('/delete/:taskId', protectRoute, deleteTask);
router.patch('/move/:taskId', protectRoute, moveTaskToCategory);

export default router;
