var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookingSchema = new Schema({
  userFirstname: String,
  userLastname: String,
  isBooked: Boolean,
  trainerEmail: String,
  service: String,
  duration: String,
  date: String
});

module.exports = mongoose.model('Booking', BookingSchema);

