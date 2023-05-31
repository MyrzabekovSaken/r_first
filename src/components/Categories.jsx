import React, { useState } from "react";


const Categories = ({categoryId}) => {
    const[activeIndex, setActiveIndex] = useState(0);

    const categories = ["All", "England", "Spain", "Germany", "Italy", "Other"];

    return (
        <div>
            { categories.map((category, i) => (
            <button onClick={() => setActiveIndex(i)} className={activeIndex == i ? "active" : ""}> {category} </button>)) }
        </div>
    );
};

export default Categories;
