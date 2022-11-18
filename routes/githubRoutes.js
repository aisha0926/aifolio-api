import express from 'express';
const router = express.Router();

import githubController from '../controllers/githubController.js';

router.get('/repos', githubController.getAllRepos);
router.get('/languages', githubController.getLanguages);

export default router;
