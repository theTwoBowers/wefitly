const BookingSchema = require('./bookingSchema.js');
const UserModel = require('./userSchema.js').UserModel;

module.exports = {

  addBooking: function(req, res) {
    UserModel.find({username: req.session.email}).exec(function(err, doc) {
      console.log('inside findOne:', req.session.email);
      if (err) {
        res.sendStatus(501);
      } else {
        console.log('user-info for booking: ', doc);
        console.log('req.body:', req.body);
        new BookingSchema({
          userFirstname: doc[0].firstname,
          userLastname: doc[0].lastname,
          isBooked: !req.body.isBooked,
          trainerEmail: req.body.trainerEmail,
          userEmail: req.session.email,
          service: req.body.service,
          duration: req.body.duration,
          date: req.body.date
        }).save((err) => {
          if (err) {
            res.sendStatus(501);
          } else {
            res.sendStatus(201);
          }
        });
      }
    });
  },

  displayBookings: function(req, res) {
    console.log('req.session.email', req.session);
    BookingSchema.find({trainerEmail: req.session.email}).exec(function(err, booking) {
      if (err) {
        console.error(err); 
      } else {
        res.send(booking);
      }
    });
  },

  displayUserBookings: function(req, res) {
    BookingSchema.find({userEmail: req.session.email}).exec(function(err, booking) {
      if (err) {
        console.error(err);
      } else {
        res.send(booking);
      }
    });
  },

  confirmBooking: function(req, res) {
    BookingSchema.findByIdAndUpdate(
      req.body._id,
      {$set: { isBooked: true } }
    ).exec(function(err, booking) {
      if (err) {
        console.error(err);
      } else {
        console.log('Confirmed Booking id -', req.body._id);
        res.end();
      }
    });
  },

  deleteBooking: function(req, res) {
    BookingSchema.remove({_id: req.body._id}).exec(function(err, booking) {
      if (err) {
        console.error(err);
      } else {
        console.log('Deleted Booking id -', req.body._id);
        res.end();
      }
    });
  }
};
