const UserModel = require('./userMethods.js');

module.exports = {

  signin: function(req, res) {
    const password = req.body.password;
    const email = req.body.email;
    UserModel.comparePassword(email, password, (err, isMatch)=>{
      if (err) {
        res.end(err);
      }
      if (isMatch) {      
        req.session.email = email;
        req.session.save();
        res.end('success');
      } else {
        res.sendStatus(504);
      }
    });
  },

  signup: function(req, res) {
    const user = req.body;
    const email = req.body.email;
    UserModel.signup(user, (err) => {
      if (err) {
        res.end('fail');
      } else {
        req.session.email = email;
        req.session.save();
        res.end('success');
      }
    });
  },

  getUser: function(req, res) {
    UserModel.find({username: req.session.email}).then(function(userInfo) {
      res.json(userInfo[0].location);
    });
  }

};




