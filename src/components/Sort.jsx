import React, { useState } from "react";

const Sort = () => {
    const [selected, setSelected] = useState(0);
    const list = ["A-Z", "price"];

    return (
        <div>
                { list.map((name, i) => ( <button key={i} onClick={() => setSelected(i)} className={selected == i ? "active" : ""}> {name} </button> )) }
        </div>
    );
};

export default Sort;
