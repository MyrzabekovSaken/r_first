import React, { useState, useEffect } from 'react';

const API_URL = 'http://127.0.0.1:3000/products'

const PriceFilter = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
  
    useEffect(() => {
      fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          setFilteredProducts(data);
        })
        .catch(error => console.log(error));
    }, []);
  
    const handleFilter = () => {
      const filtered = products.filter(product => {
        if (minPrice && maxPrice) {
          return product.price >= minPrice && product.price <= maxPrice;
        } else if (minPrice) {
          return product.price >= minPrice;
        } else if (maxPrice) {
          return product.price <= maxPrice;
        }
        return true;
      });
      setFilteredProducts(filtered);
    };

  return (
    <div>
      <p>Price filter</p>
      <label></label>
      <input type="number" name="minPrice" min={0} max={200} placeholder='from' value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />

      <label></label>
      <input type="number" name="maxPrice" min={0} max={200} placeholder='to' value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />


      <button onClick={handleFilter}>Filter</button>
        <div className="image-list">
          {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.img} alt={product.name} />
              <div className="product-info">
                <p>{product.title}</p>
                <p>Price: ${product.price}</p>
             </div>
          </div>
          ))}
        </div>
    </div>
  );
}

export default PriceFilter;

