const express = require('express');
const router = express.Router();
const {
  getGemstones,
  getGemstoneById,
  createGemstone,
  updateGemstone,
  deleteGemstone,
} = require('../controllers/gemstoneController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getGemstones)
  .post(protect, admin, createGemstone);

router.route('/:id')
  .get(getGemstoneById)
  .put(protect, admin, updateGemstone)
  .delete(protect, admin, deleteGemstone);

module.exports = router;
