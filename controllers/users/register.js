const { catchAsync } = require('../../utils');
const createError = require('http-errors');
const { v4: uuidv4 } = require('uuid');

const { userRegisterValidator } = require('../../utils');
const { User } = require('../../models');
const { sendEmail } = require('../../helpers/index');

const register = catchAsync(async (req, res, next) => {
  const { name, email, password, subscription } = req.body;

  const { error } = userRegisterValidator({
    name,
    email,
    password,
    subscription,
  });
  if (error) {
    throw createError(400, error.message);
  }

  // check if entered email alreaddy exists
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, `User with email ${email} already exist`);
  }

  const verificationToken = uuidv4();

  const newUser = new User({
    name,
    email,
    password,
    subscription,
    verificationToken,
  });

  await newUser.save();

  newUser.password = undefined;

  const msg = {
    to: email,
    subject: 'Verify email',
    text: `http://localhost:3000/api/users/verify/${verificationToken} - verify email`,
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Verify email</a>`,
  };

  await sendEmail(msg);

  res.status(201).json({
    status: 'added',
    code: 201,
    data: {
      user: {
        email,
        subscription: subscription || 'starter',
        verificationToken,
      },
    },
  });
});

module.exports = register;
