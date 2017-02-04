var reviewModel = require('./trainerReviewSchema.js');

module.exports = {
  getAll: function(req, res) {
    reviewModel.find({trainer: req.query.trainer}).then(function(reviews) {
      res.json(reviews);
    });
  },

  postOne: function(req, res) {
    var post = {
      name: req.body.name,
      review: req.body.review,
      // rating: req.body.rating,
      trainer: req.body.trainer
    };
    reviewModel.create(post).then(function() {
      res.sendStatus(201);
    });
  }
};