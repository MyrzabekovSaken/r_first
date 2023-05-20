import { Link } from "react-router-dom";
import Navbar from  "../components/Navbar";
import Button from "../components/Button";

const Products = () => {
    const sayHello = () => {
        alert("Hello!");
    }

    return (
        <div>
            <Navbar/>
            <h1>Products</h1>
            <Button text="Add to Cart" onClick={sayHello}></Button>
        </div>
    );
};

export default Products;
