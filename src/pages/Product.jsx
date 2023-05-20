import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar"


const Product = () => {
    const {id} = useParams();
    const [searchParams] = useSearchParams();

    return (
        <div>
            <Navbar></Navbar>
            <h1>Product #{id}</h1>
            <h2>SearchParams: {searchParams.get("page")}</h2>
        </div>
    );
};

export default Product;
