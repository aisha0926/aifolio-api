import express from 'express';
const router = express.Router();

import auth from '../config/auth.js';
const { verifyToken, verifyAdmin } = auth;

import githubController from '../controllers/githubController.js';

router.get('/repos', verifyToken, verifyAdmin, githubController.getAllRepos);
router.get(
  '/languages',
  verifyToken,
  verifyAdmin,
  githubController.getLanguages
);
router.get(
  '/languages/recent',
  verifyToken,
  verifyAdmin,
  githubController.getRecentRepo
);

export default router;
