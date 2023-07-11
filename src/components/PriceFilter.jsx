import React, { useState } from 'react';

function PriceFilter({ onPriceChange }) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleMinPriceChange = (event) => {
    setMinPrice(Number(event.target.value));
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const parsedMinPrice = parseFloat(minPrice);
    const parsedMaxPrice = parseFloat(maxPrice);

    if (parsedMinPrice === 0 && parsedMaxPrice === 0) {
      onPriceChange(0, Infinity);
    } else {
      onPriceChange(parsedMinPrice, parsedMaxPrice); 
    }  
  };

  return (
    <div>
      <h3>Search by price</h3>
      <form onSubmit={handleSubmit}>
      <label htmlFor='minPrice'></label>
      <input 
        type="number" 
        id="minPrice"
        name="minPrice" 
        min={0} 
        max={200} 
        placeholder='from' 
        value={minPrice} 
        onChange={handleMinPriceChange} />

      <label htmlFor='maxPrice'></label>
      <input 
        type="number" 
        id="maxPrice"
        name="maxPrice" 
        min={0} 
        max={200} 
        placeholder='to' 
        value={maxPrice} 
        onChange={handleMaxPriceChange} />


      <button type='submit'>Filter</button>
      </form>
    </div>
  );
}

export default PriceFilter;
