import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import {
   getDatabaseCart,
   processOrder,
   removeFromDatabaseCart,
} from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';

const Review = () => {
   const [cart, setCart] = useState([]);
   const [orderPlace, setOrderPlace] = useState(false);
   //remove button handler
   const removeProduct = productKey => {
      const newCart = cart.filter(pd => pd.key !== productKey);
      setCart(newCart);
      removeFromDatabaseCart(productKey);
   };
   useEffect(() => {
      const savedCart = getDatabaseCart();
      const productKeys = Object.keys(savedCart);
      const cartProducts = productKeys.map(key => {
         const product = fakeData.find(pd => pd.key === key);
         product.quantity = savedCart[key];
         return product;
      });
      setCart(cartProducts);
   }, []);

   const handlePlaceOrder = () => {
      //reset cart
      setCart([]);
      setOrderPlace(true);
      //clean database
      processOrder();
   };
   return (
      <div className="twin-container">
         <div className="product-container">
            {cart.map(pd => (
               <ReviewItem
                  product={pd}
                  key={pd.key}
                  removeProduct={removeProduct}
               ></ReviewItem>
            ))}
            {orderPlace && <img src={happyImage} alt="" />}
         </div>
         <div className="cart-container">
            <Cart cart={cart}>
               <button className="main-button" onClick={handlePlaceOrder}>
                  Place Order
               </button>
            </Cart>
         </div>
      </div>
   );
};

export default Review;
