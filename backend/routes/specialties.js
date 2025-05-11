const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Get all specialties
router.get('/', async (req, res) => {
  try {
    // For now, return the hardcoded specialties
    const specialties = [
      {
        _id: "1",
        title: "Aesthetic Dermatologist",
        slug: "aesthetic-dermatologist",
        description: "An aesthetic dermatologist is a medical doctor who specializes in the use of medical procedures to improve the appearance of the skin."
      },
      {
        _id: "2",
        title: "Allergy Skin-VD",
        slug: "allergy-skin-vd",
        description: "A skin allergy specialist is a doctor who specializes in the diagnosis and treatment of skin allergies. They are also known as allergists or dermatologists."
      },
      // Add more specialties here...
    ];

    res.status(200).json({
      success: true,
      data: specialties
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Get specialty by ID
router.get('/:id', async (req, res) => {
  try {
    // For now, return a mock specialty
    const specialty = {
      _id: req.params.id,
      title: "Aesthetic Dermatologist",
      slug: "aesthetic-dermatologist",
      description: "An aesthetic dermatologist is a medical doctor who specializes in the use of medical procedures to improve the appearance of the skin."
    };

    res.status(200).json({
      success: true,
      data: specialty
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Get specialties by category
router.get('/category/:category', async (req, res) => {
  try {
    // For now, return mock specialties
    const specialties = [
      {
        _id: "1",
        title: "Aesthetic Dermatologist",
        slug: "aesthetic-dermatologist",
        description: "An aesthetic dermatologist is a medical doctor who specializes in the use of medical procedures to improve the appearance of the skin.",
        category: req.params.category
      }
    ];

    res.status(200).json({
      success: true,
      data: specialties
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router; 