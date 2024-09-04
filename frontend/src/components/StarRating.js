import React from 'react';

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const filledStars = Math.round(rating);
  const emptyStars = totalStars - filledStars;

  return (
    <div className="flex" title={`Rating: ${rating.toFixed(2)}`}>  
      {[...Array(filledStars)].map((_, index) => (
        <i key={index} className="fa fa-star text-orange-500 text-bold mr-1"></i>
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <i key={index + filledStars} className="fa fa-star text-custom-tan-blue mr-1"></i>
      ))}
    </div>
  );
};

export default StarRating;
