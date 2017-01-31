const BookingSchema = require('./bookingSchema.js');
const UserModel = require('./userSchema.js').UserModel;

module.exports = {

  addBooking: function(req, res) {

    UserModel.find({username: req.session.email}).exec(function(err, doc){
      console.log("inside findOne:", req.session.email)
      if (err) {
        res.sendStatus(501)
      } else {

          console.log('user-info for booking: ', doc);
          console.log('req.body:', req.body);
        new BookingSchema({
          userFirstname: doc[0].firstname,
          userLastname: doc[0].lastname,
          isBooked: req.body.isBooked,
          trainerEmail: req.body.trainerEmail,
          service: req.body.service,
          duration: req.body.duration
        }).save((err) => {
          if (err){
            res.sendStatus(501);
          }else{
            res.sendStatus(201);
          }
        });
      }
    })
  },

  displayBookings: function(req, res) {
    console.log('req.session.email', req.session);
    BookingSchema.find({trainerEmail: req.session.email}).exec(function(err, booking) {
      if (err) throw err;
      else {
        res.send(booking);
      }
    });
  }
}