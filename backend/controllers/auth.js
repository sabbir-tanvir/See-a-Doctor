const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  console.log('Register request received:', req.body);
  
  const { name, email, password, role, phone, address, gender, birthDate, specialization, education, experience, hospital, fee } = req.body;

  // Default values for required fields if not provided
  const userData = {
    name,
    email,
    password,
    role: role || 'user',
  };

  console.log('Processing user data:', userData);

  // Only add optional fields if they are provided
  if (address) userData.address = address;
  if (gender) userData.gender = gender;
  if (birthDate) userData.birthDate = birthDate;

  // Only add phone if it's a non-empty string
  if (phone && phone.trim() !== '') {
    userData.phone = phone;
    console.log('Phone number provided:', phone);
  } else {
    console.log('No phone number provided');
  }

  // Add doctor-specific fields if role is doctor
  if (role === 'doctor') {
    if (specialization) userData.specialization = specialization;
    if (education) userData.education = education;
    if (experience) userData.experience = experience;
    if (hospital) userData.hospital = hospital;
    if (fee) userData.fee = fee;
  }

  console.log('Final user data to be saved:', userData);

  // Create user
  const user = await User.create(userData);
  console.log('User created successfully with ID:', user._id);

  // Try to send confirmation email, but don't block registration if it fails
  try {
    // Generate email confirmation token
    const confirmEmailToken = user.generateEmailConfirmToken();

    // Create reset url
    const confirmEmailURL = `${req.protocol}://${req.get(
      'host',
    )}/auth/confirmemail?token=${confirmEmailToken}`;

    const message = `You are receiving this email because you need to confirm your email address. Please make a GET request to: \n\n ${confirmEmailURL}`;

    user.save({ validateBeforeSave: false });

    // Try to send email, but continue even if it fails
    await sendEmail({
      email: user.email,
      subject: 'Email confirmation token',
      message,
    });
    
    console.log('Confirmation email sent successfully');
  } catch (err) {
    console.error('Failed to send confirmation email:', err.message);
    // Continue with registration even if email fails
  }

  // Return token response regardless of email success
  sendTokenResponse(user, 200, res);
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate emil & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Public
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Get current logged in user
// @route     GET /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  // user is already available in req due to the protect middleware
  const user = req.user;

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message,
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

/**
 * @desc    Confirm Email
 * @route   GET /api/v1/auth/confirmemail
 * @access  Public
 */
exports.confirmEmail = asyncHandler(async (req, res, next) => {
  // grab token from email
  const { token } = req.query;

  if (!token) {
    return next(new ErrorResponse('Invalid Token', 400));
  }

  const splitToken = token.split('.')[0];
  const confirmEmailToken = crypto
    .createHash('sha256')
    .update(splitToken)
    .digest('hex');

  // get user by token
  const user = await User.findOne({
    confirmEmailToken,
    isEmailConfirmed: false,
  });

  if (!user) {
    return next(new ErrorResponse('Invalid Token', 400));
  }

  // update confirmed to true
  user.confirmEmailToken = undefined;
  user.isEmailConfirmed = true;

  // save
  user.save({ validateBeforeSave: false });

  // return token
  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    data: user
  });
};
