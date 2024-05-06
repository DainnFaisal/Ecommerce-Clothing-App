import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom'; 
import '../StyleSheets/Cart.css'

const Cart = () => {
  
  const { cart, removeFromCart } = useCart();
  
  return (
    <div>
      <h2 className='cart-heading'>Cart:</h2>

      <ul>
        {cart.map((item, index) => (
          <div className='cart-item' key={index}>
            <img src={item.image} alt={item.title} style={{ maxWidth: '150px', borderRadius:'10px' }} />

            <p className='item-name'>Item Name:</p>
            {item.title} 
            <br/>
            <p className='item-price'>Item Price:</p>
             ${item.price}
            <br/>
            <button className='remove-cart-item-btn' onClick={() => removeFromCart(index)}>Remove</button>
          </div>
        ))}
      </ul>

      <Link to="/checkout">
        <button className='checkout-btn'>Check Out</button>
      </Link>
      
    </div>
  );
};

export default Cart;
