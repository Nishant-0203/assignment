const jwt = require('jsonwebtoken');
const Recommendation = require('../models/Recommendation');
const Gemstone = require('../models/Gemstone');
const User = require('../models/User');
const { evaluateRecommendation } = require('../utils/engine');

// @desc    Generate recommendation and optionally save it
// @route   POST /api/recommend
// @access  Public (saves if logged in)
const createRecommendation = async (req, res) => {
  try {
    const { name, dob, zodiacSign, birthMonth, lifeGoal, budgetRange } = req.body;

    if (!name || !zodiacSign || !birthMonth || !lifeGoal || !budgetRange) {
      return res.status(400).json({ success: false, error: 'Missing required search inputs' });
    }

    // Retrieve all gemstones from database
    const gemstones = await Gemstone.find({});
    if (gemstones.length === 0) {
      return res.status(500).json({ success: false, error: 'No gemstones found in database. Ask admin to seed data.' });
    }

    // Process inputs in engine
    const evaluation = evaluateRecommendation(gemstones, { name, dob, zodiacSign, birthMonth, lifeGoal, budgetRange });

    // Optional user authentication to save history
    let savedRecommendation = null;
    let userId = null;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretgemfinderkey12345');
        const user = await User.findById(decoded.id);
        if (user) {
          userId = user._id;

          // Save recommendation in DB
          savedRecommendation = await Recommendation.create({
            userId,
            gemstoneId: evaluation.gemstone._id,
            recommendationReason: evaluation.recommendationReason,
            inputs: { name, dob, zodiacSign, birthMonth, lifeGoal, budgetRange },
          });
        }
      } catch (err) {
        console.warn('Optional auth token validation failed, recommending as guest.');
      }
    }

    res.status(200).json({
      success: true,
      data: {
        recommendedGemstone: evaluation.gemstone,
        score: evaluation.score,
        recommendationReason: evaluation.recommendationReason,
        saved: !!savedRecommendation,
        recommendationId: savedRecommendation ? savedRecommendation._id : null,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get recommendation history
// @route   GET /api/recommend/history
// @access  Private
const getRecommendationHistory = async (req, res) => {
  try {
    let history;

    // Admin sees all history, regular users only see their own
    if (req.user.role === 'admin') {
      history = await Recommendation.find({})
        .populate('userId', 'name email')
        .populate('gemstoneId')
        .sort({ createdAt: -1 });
    } else {
      history = await Recommendation.find({ userId: req.user.id })
        .populate('gemstoneId')
        .sort({ createdAt: -1 });
    }

    res.json({ success: true, count: history.length, data: history });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Admin: Get all users
// @route   GET /api/recommend/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Admin: Delete a user
// @route   DELETE /api/recommend/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Don't allow deleting self
    if (user._id.toString() === req.user.id.toString()) {
      return res.status(400).json({ success: false, error: 'You cannot delete yourself' });
    }

    // Delete user recommendations first
    await Recommendation.deleteMany({ userId: req.params.id });

    // Delete user
    await User.deleteOne({ _id: req.params.id });

    res.json({ success: true, message: 'User and their recommendation history deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createRecommendation,
  getRecommendationHistory,
  getAllUsers,
  deleteUser,
};
