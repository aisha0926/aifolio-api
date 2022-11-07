const express = require('express');
const router = express.Router();

const auth = require('../auth');
const { verifyToken, verifyAdmin } = auth;

const adminControllers = require('../controllers/adminController');

// Sign up router
router.post('/signup', adminControllers.signUp);
router.post('/login', adminControllers.login);
router.put(
  '/addUserData',
  verifyToken,
  verifyAdmin,
  adminControllers.addUserData
);
// router.put(
//   '/updateUserDetails',
//   verifyToken,
//   verifyAdmin,
//   adminControllers.updateUserData
// );
router.get('/getUserData', verifyToken, adminControllers.getUserData);
router.get('/getAllUser', adminControllers.getAllUser);

module.exports = router;
