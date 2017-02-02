var Q = require('q');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  location: String,
  salt: String
});

UserSchema.pre('save', function (next) {
  let newUser = this;
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return console.error(err);
    }
    bcrypt.hash(newUser.password, salt, null, (error, hash) => {
      if (error) {
        return console.error(error);
      }
      newUser.password = hash;
      newUser.salt = salt;
      next();
    });
  });
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = {
  UserSchema: UserSchema,
  UserModel: UserModel,
};
