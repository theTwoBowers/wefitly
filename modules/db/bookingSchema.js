var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookingSchema = new Schema({
  userFirstname: String,
  userLastname: String,
  userEmail: String,
  trainerName: String,
  trainerEmail: String,
  service: String,
  isBooked: Boolean,
  duration: String,
  date: String,
<<<<<<< HEAD
  messages: [String]
=======
>>>>>>> Convert UserDash into class
});

module.exports = mongoose.model('Booking', BookingSchema);
