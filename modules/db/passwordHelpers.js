const bcrypt = require('bcrypt-nodejs');
module.exports = {

  signup: function (entry, model, next) {
    let newEntry = new model({
      firstname: entry.firstname,
      lastname: entry.lastname,
      username: entry.email,
      password: entry.password,
      location: entry.location,
    })
    .save((err)=>{
      next(err);
    });
  },

  comparePassword: (email, candidatePassWord, query, next) => {
    query({username: email})
    .then((match) => {
      if (match) {
        bcrypt.compare(candidatePassWord, match.password, (err, isMatch) =>{
          if (err) {
            next(err, null);
          }
          next(null, isMatch);
        });
      } else {
        next('email not found');
      }
    });
  }

};