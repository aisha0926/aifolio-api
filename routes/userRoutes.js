import express from 'express';
const router = express.Router();

import auth from '../auth.js';
const { verifyToken, verifyAdmin } = auth;

import adminControllers from '../controllers/adminController.js';

// Sign up router
router.post('/signup', adminControllers.signUp);
router.post('/login', adminControllers.login);
router.put('/add', verifyToken, verifyAdmin, adminControllers.addUserData);
router.patch(
  '/update',
  verifyToken,
  verifyAdmin,
  adminControllers.updateUserData
);
router.get(
  '/get/single',
  verifyToken,
  verifyAdmin,
  adminControllers.getUserData
);
router.get(
  '/get/all',

  adminControllers.getAllUser
);

export default router;
