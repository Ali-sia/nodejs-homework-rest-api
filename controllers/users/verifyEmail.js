const createError = require('http-errors');

const { catchAsync } = require('../../utils/index');
const { User } = require('../../models');

const verifyEmail = catchAsync(async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw createError(404, 'User not found');
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Verification successful',
  });
});

module.exports = verifyEmail;
