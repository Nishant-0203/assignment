const Gemstone = require('../models/Gemstone');

// @desc    Get all gemstones
// @route   GET /api/gemstones
// @access  Public
const getGemstones = async (req, res) => {
  try {
    const gemstones = await Gemstone.find({});
    res.json({ success: true, count: gemstones.length, data: gemstones });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single gemstone
// @route   GET /api/gemstones/:id
// @access  Public
const getGemstoneById = async (req, res) => {
  try {
    const gemstone = await Gemstone.findById(req.params.id);
    if (!gemstone) {
      return res.status(404).json({ success: false, error: 'Gemstone not found' });
    }
    res.json({ success: true, data: gemstone });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Create a gemstone
// @route   POST /api/gemstones
// @access  Private/Admin
const createGemstone = async (req, res) => {
  try {
    const {
      name,
      zodiacSigns,
      birthMonths,
      suitableGoals,
      description,
      benefits,
      color,
      image,
      priceRange,
      careInstructions,
    } = req.body;

    // Validate if gemstone name already exists
    const gemExists = await Gemstone.findOne({ name });
    if (gemExists) {
      return res.status(400).json({ success: false, error: 'A gemstone with this name already exists' });
    }

    const gemstone = new Gemstone({
      name,
      zodiacSigns: Array.isArray(zodiacSigns) ? zodiacSigns : [zodiacSigns],
      birthMonths: Array.isArray(birthMonths) ? birthMonths : (birthMonths ? [birthMonths] : []),
      suitableGoals: Array.isArray(suitableGoals) ? suitableGoals : (suitableGoals ? [suitableGoals] : []),
      description,
      benefits: Array.isArray(benefits) ? benefits : [benefits],
      color,
      image,
      priceRange,
      careInstructions,
    });

    const createdGemstone = await gemstone.save();
    res.status(201).json({ success: true, data: createdGemstone });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update a gemstone
// @route   PUT /api/gemstones/:id
// @access  Private/Admin
const updateGemstone = async (req, res) => {
  try {
    const {
      name,
      zodiacSigns,
      birthMonths,
      suitableGoals,
      description,
      benefits,
      color,
      image,
      priceRange,
      careInstructions,
    } = req.body;

    const gemstone = await Gemstone.findById(req.params.id);

    if (!gemstone) {
      return res.status(404).json({ success: false, error: 'Gemstone not found' });
    }

    // Check name duplication if name is being changed
    if (name && name !== gemstone.name) {
      const gemExists = await Gemstone.findOne({ name });
      if (gemExists) {
        return res.status(400).json({ success: false, error: 'A gemstone with this name already exists' });
      }
      gemstone.name = name;
    }

    if (zodiacSigns !== undefined) gemstone.zodiacSigns = Array.isArray(zodiacSigns) ? zodiacSigns : [zodiacSigns];
    if (birthMonths !== undefined) gemstone.birthMonths = Array.isArray(birthMonths) ? birthMonths : [birthMonths];
    if (suitableGoals !== undefined) gemstone.suitableGoals = Array.isArray(suitableGoals) ? suitableGoals : [suitableGoals];
    if (description !== undefined) gemstone.description = description;
    if (benefits !== undefined) gemstone.benefits = Array.isArray(benefits) ? benefits : [benefits];
    if (color !== undefined) gemstone.color = color;
    if (image !== undefined) gemstone.image = image;
    if (priceRange !== undefined) gemstone.priceRange = priceRange;
    if (careInstructions !== undefined) gemstone.careInstructions = careInstructions;

    const updatedGemstone = await gemstone.save();
    res.json({ success: true, data: updatedGemstone });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete a gemstone
// @route   DELETE /api/gemstones/:id
// @access  Private/Admin
const deleteGemstone = async (req, res) => {
  try {
    const gemstone = await Gemstone.findById(req.params.id);

    if (!gemstone) {
      return res.status(404).json({ success: false, error: 'Gemstone not found' });
    }

    await Gemstone.deleteOne({ _id: req.params.id });
    res.json({ success: true, message: 'Gemstone removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getGemstones,
  getGemstoneById,
  createGemstone,
  updateGemstone,
  deleteGemstone,
};
