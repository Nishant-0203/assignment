const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    gemstoneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gemstone',
      required: true,
    },
    recommendationReason: {
      type: String,
      required: true,
    },
    inputs: {
      name: { type: String, required: true },
      dob: { type: String },
      zodiacSign: { type: String, required: true },
      birthMonth: { type: String, required: true },
      lifeGoal: { type: String, required: true },
      budgetRange: { type: String, required: true },
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

module.exports = mongoose.model('Recommendation', RecommendationSchema);
