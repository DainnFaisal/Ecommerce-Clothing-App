import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce'; 
import '../StyleSheets/Products.css';

const Products = () => {
    
    const [products, setProducts] = useState([]);
    const [filteredCategory, setFilteredCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Get request to read products
    const fetchProducts = () => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    // Fetch products on initial render
    useEffect(() => {
        fetchProducts();
    }, []);

    // Function to filter products based on category
    const filterProducts = (category) => {
        if (category === filteredCategory) {
            setFilteredCategory(''); // If already filtered, then removing filter
        } else {
            setFilteredCategory(category);
        }
    };

    // Filtering products based on selected category
    const filteredProducts = filteredCategory
        ? products.filter(product => product.category === filteredCategory)
        : products;

    // Debounce search function
    const debouncedSearch = debounce((term) => {
        setSearchTerm(term);
    }, 3000); // 3000ms debounce time

    // Function to handle search input change
    const handleSearchChange = (event) => {
        const term = event.target.value;
        debouncedSearch(term);
    };

    // Apply search filter after category filter
    const filteredProductsBySearch = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div>
                <div className='filter'>
                    <h2 className='categories-heading'>Categories:</h2>
                    <ul>
                        <li className='category-list' onClick={() => filterProducts("men's clothing")}>Men's clothing</li>
                        <li className='category-list' onClick={() => filterProducts("women's clothing")}>Women's clothing</li>
                        <li className='category-list' onClick={() => filterProducts("jewelery")}>Jewelry</li>
                        <li className='category-list' onClick={() => filterProducts("electronics")}>Electronics</li>
                    </ul>
                </div>
                <br />
                <div>
                    <input
                        className="search-bar form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={handleSearchChange} 
                    />
                </div>
                <br />
                <h2 className='products-list-heading'>Products List:</h2>
                <br />
                <table className='product-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Image</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredProductsBySearch.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>
                                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                                </td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.description}</td>
                                
                                <td>
                                    <img src={product.image} alt={product.title} style={{ maxWidth: '80px' }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Products;
