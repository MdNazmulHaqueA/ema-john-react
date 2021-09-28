import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
   const first10 = fakeData.slice(0, 10);

   //states
   const [products, setProducts] = useState(first10);
   const [cart, setCart] = useState([]);

   //add to cart button handler
   const handleAddProduct = product => {
      // console.log('Product added', product);
      const newCart = [...cart, product];
      setCart(newCart);
      const sameProduct = newCart.filter(pd => pd.key === product.key);
      const count = sameProduct.length;
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
