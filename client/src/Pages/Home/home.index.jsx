// import { Link } from "react-router-dom";
import FormComponent from "../../components/Form/Form";
import { useState } from "react";

const HomePage = () => {
  const [homeformData, setHomeFormData] = useState({
    location: "",
    price: 0,
    cuisine: "",
  });

  return (
    <div className="home">
      <div className="home-content">
        <span>Welcome to</span><h1> Grub Roulette</h1>
        <FormComponent data={homeformData} setData={setHomeFormData} />
        {/* <Link to={"/game"}>Start Here</Link> */}
      </div>
      <img src="./home-page-img.png" />


    </div>
  );
};

export default HomePage;
