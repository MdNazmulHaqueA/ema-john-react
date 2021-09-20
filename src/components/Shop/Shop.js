import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';

const Shop = () => {
   const first10 = fakeData.slice(0, 10);
   const [products, setProducts] = useState(first10);
   return (
      <div className="shop-container">
         <div className="product-container">
            <ul>
               {products.map(pd => (
                  <li key={pd.key}>{pd.name}</li>
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
