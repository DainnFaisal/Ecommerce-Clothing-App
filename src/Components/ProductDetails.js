import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext.js'
import '../StyleSheets/ProductDetails.css';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <>
      <div className='product-details'>
        <br/>
        <h3 className='product-title'><b>Product Title:</b> {product.title}</h3>
        <img src={product.image} alt={product.title} style={{ maxWidth: '200px' }} />
        <br/>           
        <p><b>Description:</b> {product.description}</p>

        <p><b>Price:</b> ${product.price}</p>
        
        <button className='cart-btn' onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </>
  );
};

export default ProductDetails;
