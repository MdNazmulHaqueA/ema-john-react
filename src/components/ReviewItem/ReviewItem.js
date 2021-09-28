import React from 'react';

const ReviewItem = props => {
   const { name, quantity } = props.product;
   const reviewItemStyle = {
      borderBottom: '1px solid lightgray',
      padding: '10px',
      marginLeft: '200px',
      marginBottom: '5px',
   };
   return (
      <div className="review-item" style={reviewItemStyle}>
         <h4 className="product-name">{name}</h4>
         <p>Quantity: {quantity}</p>
         <br />
         <button className="main-button">Remove</button>
      </div>
   );
};

export default ReviewItem;
