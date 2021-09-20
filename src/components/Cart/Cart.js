import React from 'react';
import './Cart.css';
const Cart = props => {
   const { cart } = props;
   // console.log(cart);
   const productPrice = cart.reduce((total, prd) => total + prd.price, 0);
   let shipping = 0;
   if (productPrice > 35) {
      shipping = 0;
   } else if (productPrice > 15) {
      shipping = 4.99;
   } else if (productPrice > 0) {
      shipping = 12.99;
   }

   const totalPrice = Number(productPrice + shipping);
   console.log(totalPrice);
   const tax = Number((totalPrice / 10).toFixed(2));
   console.log(tax);
   const grandTotal = (totalPrice + tax).toFixed(2);

   return (
      <div>
         <h3>Order Summary</h3>
         <p>Items ordered: {cart.length}</p>
         <p>Product Price: {productPrice.toFixed(2)}</p>
         <p>
            <small>Shipping Cost: {shipping}</small>
         </p>
         <p>
            <small>Tax (10%): {tax}</small>
         </p>
         <p>Total Price: {grandTotal}</p>
      </div>
   );
};

export default Cart;
