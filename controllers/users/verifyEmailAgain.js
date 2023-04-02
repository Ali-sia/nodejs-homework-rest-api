const createError = require('http-errors');
const { v4: uuidv4 } = require('uuid');

const { catchAsync } = require('../../utils/index');
const { User } = require('../../models');
const { sendEmail } = require('../../helpers/index');

const verifyEmailAgain = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email, verify: false });

  if (!user) {
    throw createError(400, 'Verification has already been passed');
  }

  const verificationToken = uuidv4();

  await User.findByIdAndUpdate({ _id: user._id }, { verificationToken });

  await sendEmail(email);

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Verification email sent',
  });
});

module.exports = verifyEmailAgain;
