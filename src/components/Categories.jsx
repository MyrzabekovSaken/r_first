import React, { useState } from "react";


const Categories = ({categoryId, onChangeCategory}) => {
    // const[activeIndex, setActiveIndex] = useState(0);

    const categories = ["All", "England", "Spain", "Germany", "Italy", "Other"];

    return (
        <div>
            { categories.map((categoryName, i) => (
            <button 
            key={i}
            onClick={() => onChangeCategory(i)} 
            className={categoryId == i ? "active" : ""}> 
            {categoryName} 
            </button>
            )) }
        </div>
    );
};

export default Categories;
