import Card from "../components/Card/Card";
import Navbar from "../components/Navbar";
import productsController from "../controller/products";
import { useEffect, useRef, useState } from "react";
import PriceFilter from "../components/PriceFilter";
import Categories from "../components/Categories";



const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [totalProducts, setTotalProducts] = useState(0);
  const [priceFilter, setPriceFilter] = useState({min: 0, max: Infinity});
  const [categoryFilter, setCategoryFilter] = useState(0);
  const [sortingOption, setSortingOption] = useState({ field:"", order:"" });

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, currentPage, priceFilter, categoryFilter, sortingOption]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await productsController.getProducts();
      setTotalProducts(data.length);
      let filteredProducts = data;

      if (searchQuery || priceFilter.min !== 0 || priceFilter.max !== Infinity || categoryFilter !== 0) {
        // Filter products based on search query, price, and category
        filteredProducts = data.filter((product) => {
          const titleMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
          const priceMatch = product.price >= priceFilter.min && product.price <= priceFilter.max;
          const categoryMatch = categoryFilter === 0 || product.categoryId === categoryFilter;
          return titleMatch && priceMatch && categoryMatch;
        });
      }

      // Sort products based on the sorting option
      if (sortingOption.field === "price") {
        if (sortingOption.order === "asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortingOption.order === "desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
      }

      } else if (sortingOption.field === "title") {
        if (sortingOption.order === "asc") {
          filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortingOption.order === "desc") {
          filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
        }
        }
      

      setProducts(filteredProducts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePriceFilterChange = (min, max) => {
    setPriceFilter({min, max});
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId) => {
    setCategoryFilter(categoryId);
    setCurrentPage(1);
  };

  const handleSortingOptionChange = (field, order) => {
    setSortingOption({field, order});
    setCurrentPage(1);
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <Navbar />

      <div>
        <h3>Search by name</h3>
        <input
          type="text"
          placeholder="Enter product name"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

      <div>
        <PriceFilter onPriceChange={handlePriceFilterChange} />
      </div>

      <div>
        <h3>Search by category</h3>
        <Categories categoryId={categoryFilter} onChangeCategory={handleCategoryChange} />
      </div>

      <div>
        <h3>Sort</h3>
          <button onClick={() => handleSortingOptionChange("price", "asc")}>Price Asc</button>
          <button onClick={() => handleSortingOptionChange("price", "desc")}>Price Desc</button>
          <button onClick={() => handleSortingOptionChange("title", "asc")}>Name A-Z</button>
          <button onClick={() => handleSortingOptionChange("title", "desc")}>Name Z-A</button>
      </div>

      <div>
        <h1>Products</h1>
        {currentProducts.map((product) => (
          <Card key={product.id} product={product} /> 
        ))}
      </div>

      <div>
          <button onClick={prevPage} disabled={currentPage === 1}>Previous Page</button>
          <button onClick={nextPage} disabled={currentPage === totalPages}>Next Page</button>
      </div>
            
    </div>
  );
};


export default Products;
