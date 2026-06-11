const express = require('express');
const router = express.Router();
const {
  createRecommendation,
  getRecommendationHistory,
  getAllUsers,
  deleteUser,
} = require('../controllers/recommendationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', createRecommendation); // Saves recommendation if JWT is provided
router.get('/history', protect, getRecommendationHistory);
router.get('/admin/users', protect, admin, getAllUsers);
router.delete('/admin/users/:id', protect, admin, deleteUser);

module.exports = router;
