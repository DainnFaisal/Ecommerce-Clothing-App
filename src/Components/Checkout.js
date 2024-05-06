import React from 'react';
import { useCart } from './CartContext'; 
import '../StyleSheets/Checkout.css'; 
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cart, clearCart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleCheckout = () => {
    alert('Thank you for your purchase!');
    clearCart();
  };

  return (
    <div>
      <h2 className='checkout-heading'>Checkout:</h2>
      <ul>
        <div className='checkout'> 
          {cart.map((item, index) => (
            <li key={index}>
              <img src={item.image} alt={item.title} style={{ maxWidth: '150px', borderRadius: '10px' }} />
              {item.title} -- ${item.price}
            </li>
          ))}
        </div>
      </ul>

      <p className='total'> Total: ${totalPrice.toFixed(2)} </p>
      
      <Link to="/Products">
        <button className='checkout-btn' onClick={handleCheckout}>Checkout</button>
      </Link>

    </div>
  );
};

export default Checkout;
