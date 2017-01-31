var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrainerReviewSchema = new Schema({
  name: String,
  review: String,
  rating: Number
});

module.exports = mongoose.model('TrainerReview', TrainerReviewSchema);