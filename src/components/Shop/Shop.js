import React, { useState, useEffect } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {
   getDatabaseCart,
   addToDatabaseCart,
} from '../../utilities/databaseManager';

const Shop = () => {
   const first10 = fakeData.slice(0, 10);

   //states
   const [products, setProducts] = useState(first10);
   const [cart, setCart] = useState([]);

   useEffect(() => {
      const savedCart = getDatabaseCart();
      const productKeys = Object.keys(savedCart);
      const previousCart = productKeys.map(key => {
         const product = fakeData.find(pd => pd.key === key);
         product.quantity = savedCart[key];
         return product;
      });
      setCart(previousCart);
   }, []);

   //add to cart button handler
   const handleAddProduct = product => {
      const toBeAdded = product.key;
      const sameProduct = cart.find(pd => pd.key === toBeAdded);
      let count = 1;
      let newCart;
      if (sameProduct) {
         count = sameProduct.quantity + 1;
         sameProduct.quantity = count;
         const others = cart.filter(pd => pd.key !== toBeAdded);
         newCart = [...others, sameProduct];
      } else {
         product.quantity = 1;
         newCart = [...cart, product];
      }

      setCart(newCart);
      // const sameProduct = newCart.filter(pd => pd.key === product.key);
      // const count = sameProduct.length;
      addToDatabaseCart(product.key, count);
   };

   return (
      <div className="twin-container">
         <div className="product-container">
            <ul>
               {products.map(pd => (
                  // <li key={pd.key}>{pd.name}</li>
                  <Product
                     key={pd.key}
                     product={pd}
                     showAddToCart={true}
                     handleAddProduct={handleAddProduct}
                  ></Product>
               ))}
            </ul>
         </div>
         <div className="cart-container">
            <Cart cart={cart}></Cart>
         </div>
      </div>
   );
};

export default Shop;
