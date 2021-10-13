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
import { useHistory } from 'react-router';

const Review = () => {
   const [cart, setCart] = useState([]);
   const [orderPlace, setOrderPlace] = useState(false);
   const history = useHistory();
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

   const handleProceedCheckout = () => {
      // setCart([]);
      // setOrderPlace(true);
      // processOrder();
      //now we will visit to a route on button click
      history.push('/shipment');
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
               <button className="main-button" onClick={handleProceedCheckout}>
                  Proceed Checkout
               </button>
            </Cart>
         </div>
      </div>
   );
};

export default Review;
