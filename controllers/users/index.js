const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');
const updateSubscribtion = require('./updateSubscribtion');
const updateAvatar = require('./updateAvatar');
const verifyEmail = require('./verifyEmail');
const verifyEmailAgain = require('./verifyEmailAgain');

module.exports = {
  register,
  login,
  logout,
  current,
  updateSubscribtion,
  updateAvatar,
  verifyEmail,
  verifyEmailAgain,
};
