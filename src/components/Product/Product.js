import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = props => {
   console.log(props);
   const { name, img, seller, price, stock, handleButton } = props.product;
   return (
      <div className="product">
         <div>
            <img src={img} alt="" />
         </div>
         <div>
            <h4 className="product-name">{name}</h4>
            <br />
            <p>
               <small>By {seller}</small>
            </p>
            <p>${price}</p>

            <p>
               <small>Only {stock} left in stock - Order Soon</small>
            </p>
            <button className="main-button" onClick={handleButton}>
               <FontAwesomeIcon icon={faShoppingCart} /> add to cart
            </button>
         </div>
      </div>
   );
};

export default Product;
