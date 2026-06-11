const mongoose = require('mongoose');

const GemstoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a gemstone name'],
      unique: true,
      trim: true,
    },
    zodiacSigns: {
      type: [String],
      required: [true, 'Please add suitable zodiac signs'],
    },
    birthMonths: {
      type: [String],
      default: [],
    },
    suitableGoals: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    benefits: {
      type: [String],
      required: [true, 'Please add benefits'],
    },
    color: {
      type: String,
      required: [true, 'Please add gemstone color'],
    },
    image: {
      type: String,
      required: [true, 'Please add an image URL'],
    },
    priceRange: {
      type: String,
      required: [true, 'Please add a price range'],
      enum: ['Below ₹1000', '₹1000–₹5000', '₹5000–₹10000', 'Above ₹10000'],
    },
    careInstructions: {
      type: String,
      default: 'Clean with warm soapy water and a soft cloth.',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Gemstone', GemstoneSchema);
