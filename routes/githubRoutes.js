import express from 'express';
const router = express.Router();

import githubController from '../controllers/githubController.js';

router.get('/repos', githubController.getAllRepos);
router.get('/languages', githubController.getLanguages);
router.get('/languages/recent', githubController.getRecentRepo);

export default router;
