import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import productController from "../controller/products";
import { useEffect } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchProducts = async () => {
    setLoading(true);
    const { data, status } = await productController.getProducts();
    alert(status);
    console.log(data);
    setProducts(data);
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <h1>Products</h1>
      <button onClick={fetchProducts}>fetch products</button>
      {loading ? (
        <h1>Loading...</h1>
      ) : (products.map((product) => (<div key={product.id}> <h1>{product.title}</h1> <h2>{product.price}</h2></div>)))
        } 
    </div>
  );
};

export default Products;
