import express from 'express';
const router = express.Router();

import auth from '../config/auth.js';
const { verifyToken, verifyAdmin } = auth;

import adminControllers from '../controllers/adminController.js';

// Sign up router
router.post('/signup', adminControllers.signUp);
router.post('/login', adminControllers.login);
router.put('/add', verifyToken, verifyAdmin, adminControllers.addUserData);
router.put('/update', verifyToken, verifyAdmin, adminControllers.updateUser);
router.put(
  '/update/:id',
  verifyToken,
  verifyAdmin,
  adminControllers.updateData
);
router.put(
  '/delete/:id',
  verifyToken,
  verifyAdmin,
  adminControllers.deleteData
);

// router.patch(
//   '/update',
//   verifyToken,
//   verifyAdmin,
//   adminControllers.updateUserData
// );
router.post(
  '/get/single',
  verifyToken,
  verifyAdmin,
  adminControllers.getUserData
);
router.get('/get/all', adminControllers.getAllUser);

router.post('/email', adminControllers.sendEmail);

export default router;
