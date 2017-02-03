const UserSchema = require('./userSchema.js').UserSchema;
const UserModel = require('./userSchema.js').UserModel;
const bcrypt = require('bcrypt-nodejs');
const Q = require('q');
const passwordHelpers = require('./passwordHelpers.js');

const SALT_WORK_FACTOR = 10;
const findUser = Q.nbind(UserModel.findOne, UserModel);
const findAll = Q.nbind(UserModel.find, UserModel);


UserModel.signup = (user, next) => {
  passwordHelpers.signup(user, UserModel, next);
};
 
UserModel.comparePassword = (email, candidatePassword, next) => {
  passwordHelpers.comparePassword(email, candidatePassword, findUser, next);
};

UserModel.findAllTrainers = (next) => {
  findAll({})
  .then((results) => {
    return next(results);
  })
  .catch((err) => {
    console.error(err);
  });
};

module.exports = UserModel;
