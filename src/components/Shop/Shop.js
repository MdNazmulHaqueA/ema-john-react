import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const Shop = () => {
   const first10 = fakeData.slice(0, 10);
   const [products, setProducts] = useState(first10);
   const handleAddProduct = () => {
      console.log('Product added');
   };
   return (
      <div className="shop-container">
         <div className="product-container">
            <ul>
               {products.map(pd => (
                  // <li key={pd.key}>{pd.name}</li>
                  <Product
                     key={pd.key}
                     product={pd}
                     handleButton={handleAddProduct}
                  ></Product>
               ))}
            </ul>
         </div>
         <div className="cart-container">
            <h3>This is cart</h3>
         </div>
      </div>
   );
};

export default Shop;
