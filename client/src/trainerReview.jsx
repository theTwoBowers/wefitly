import React from 'react';
import $ from 'jquery';

var trainerReviewArray = [{
  userName: 'angryCustomer',
  userReview: 'Jon sucks'
}, {
  userName: 'zak',
  userReview: 'Jon cool'
}, {
  userName: 'elliot',
  userReview: 'Jon is very cool'
}];

const submitReview = function(review, trainerName, userName) {
  $.ajax({
    url: '/api/reviews',
    type: 'POST',
    ContentType: 'application/json',
    data: {
      review: review,
      trainer: trainerName,
      name: userName
    }
  }).done(function(response) {
    console.log('review submitted');
  }).fail(function(response) {
    console.log('review data transmission failure');
  });   
};


const trainerReview = () => {
  return (
    <div>
      <h1>Reviews for Jon</h1>
      <br/>
      <span>
        {trainerReviewArray.map(function(item, index) {
          return (
            <div key={index}>
              <div>{item.userName}</div>
              <div>{item.userReview}</div>
            </div>);
        })}
        <form>
          <textarea>Write your review here</textarea>
          <button onClick={() => {
            submitReview('great workout session', 'chad', 'happycustomer');
          }}/>
        </form>
      </span>  
    </div>
  );
};

export default trainerReview;