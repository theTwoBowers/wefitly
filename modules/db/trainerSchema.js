const Q = require('q');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const SALT_WORK_FACTOR = 10;

const TrainerSchema = new Schema({
  username: String,
  password: String,
  salt: String,
  firstname: String,
  lastname: String,
  profilepic: String,
  bio: String,
  services: Object,
  rate: String,
  location: String,
  introduction: String,
});

TrainerSchema.pre('save', function (next) {
  let newTrainer = this;
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return console.error(err);
    }
    bcrypt.hash(newTrainer.password, salt, null, (error, hash) => {
      if (error) {
        return console.error(error);
      }
      newTrainer.password = hash;
      newTrainer.salt = salt;
      next();
    });
  });
});

const TrainerModel = mongoose.model('Trainer', TrainerSchema);

module.exports = {
  TrainerSchema: TrainerSchema,
  TrainerModel: TrainerModel,
};
