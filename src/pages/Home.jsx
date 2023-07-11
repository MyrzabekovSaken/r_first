import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

const Home = () => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    console.log("Number has changed");
  }, [number]);

  const handleClick = () => {
    setNumber(number + 1);
  };

  return (
    <div>
      <Navbar />

      <div style={{textAlign:"center"}}>
        <h1>WELCOME TO THE FOOTBALL SHOP</h1>
        
      </div>

    </div>
  );
};

export default Home;
