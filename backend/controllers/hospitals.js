const Hospital = require("../models/Hospital");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const path = require("path");

// @desc    Get all hospitals
// @route   GET /api/v1/hospitals
// @access  Public
exports.getHospitals = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single hospital
// @route   GET /api/v1/hospitals/:id
// @access  Public
exports.getHospital = asyncHandler(async (req, res, next) => {
  const hospital = await Hospital.findById(req.params.id).populate({
    path: 'doctors',
    select: 'name specialization image rating reviews'
  });

  if (!hospital) {
    return next(
      new ErrorResponse(`Hospital not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: hospital
  });
});

// @desc    Create new hospital
// @route   POST /api/v1/hospitals
// @access  Private
exports.createHospital = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const hospital = await Hospital.create(req.body);

  res.status(201).json({
    success: true,
    data: hospital
  });
});

// @desc    Update hospital
// @route   PUT /api/v1/hospitals/:id
// @access  Private
exports.updateHospital = asyncHandler(async (req, res, next) => {
  let hospital = await Hospital.findById(req.params.id);

  if (!hospital) {
    return next(
      new ErrorResponse(`Hospital not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is hospital owner
  if (hospital.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this hospital`,
        401
      )
    );
  }

  hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: hospital
  });
});

// @desc    Delete hospital
// @route   DELETE /api/v1/hospitals/:id
// @access  Private
exports.deleteHospital = asyncHandler(async (req, res, next) => {
  const hospital = await Hospital.findById(req.params.id);

  if (!hospital) {
    return next(
      new ErrorResponse(`Hospital not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is hospital owner
  if (hospital.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this hospital`,
        401
      )
    );
  }

  await hospital.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get hospitals by specialty
// @route   GET /api/v1/hospitals/specialty/:specialty
// @access  Public
exports.getHospitalsBySpecialty = asyncHandler(async (req, res, next) => {
  const hospitals = await Hospital.find({
    specialty: { $regex: req.params.specialty, $options: "i" }
  });

  res.status(200).json({
    success: true,
    count: hospitals.length,
    data: hospitals
  });
});

// @desc    Get hospitals by location
// @route   GET /api/v1/hospitals/location/:location
// @access  Public
exports.getHospitalsByLocation = asyncHandler(async (req, res, next) => {
  const hospitals = await Hospital.find({
    location: { $regex: req.params.location, $options: "i" }
  });

  res.status(200).json({
    success: true,
    count: hospitals.length,
    data: hospitals
  });
});

// @desc    Upload hospital photo
// @route   PUT /api/v1/hospitals/:id/photo
// @access  Private
exports.hospitalPhotoUpload = asyncHandler(async (req, res, next) => {
  const hospital = await Hospital.findById(req.params.id);

  if (!hospital) {
    return next(
      new ErrorResponse(`Hospital not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is hospital owner
  if (hospital.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this hospital`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${hospital._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Hospital.findByIdAndUpdate(req.params.id, { image: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
}); 