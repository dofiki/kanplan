import express from "express"
import { protectRoute } from "../middlewares/protectRoute.middleware.js"
import { createTask, getProjectTasks } from "../controllers/tasks.controller.js";

const router = express.Router()

router.post('/create/:projectId', protectRoute, createTask);
router.get('/project/:projectId', protectRoute, getProjectTasks);
//update task (put)
//delete task (delete)
//move task to another column (patch)

export default router;
