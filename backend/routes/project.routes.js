const express = require('express');

const router = express.Router();

const projectController = require('../controllers/projects.controller');

router.post('/create', protectRoute, projectController.createProject);
router.post('/join', protectRoute, projectController.joinProject);
router.get('/my', protectRoute, projectController.getUserProjects);

module.exports = router;
