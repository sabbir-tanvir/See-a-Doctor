const express = require("express");
const {
  getHospitals,
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital,
  getHospitalsBySpecialty,
  getHospitalsByLocation,
  hospitalPhotoUpload
} = require("../controllers/hospitals");

const router = express.Router();

// Public routes
router.route("/")
  .get(getHospitals)
  .post(createHospital);

// Routes that should be defined BEFORE parameterized routes to avoid conflicts
router.route("/specialty/:specialty")
  .get(getHospitalsBySpecialty);

router.route("/location/:location")
  .get(getHospitalsByLocation);

// Get specific hospital and operations on it
router.route("/:id")
  .get(getHospital)
  .put(updateHospital)
  .delete(deleteHospital);

// Upload hospital photo route
router.route("/:id/photo")
  .put(hospitalPhotoUpload);

module.exports = router; 