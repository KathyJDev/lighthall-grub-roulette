// import { Link } from "react-router-dom";
import FormComponent from "../../components/Form";
import { useState } from "react";

const HomePage = () => {
  const [homeformData, setHomeFormData] = useState({
    location: "",
    price: 0,
    cuisine: "",
  });

  return (
    <div className="home">
      <h1>Welcome to Grub Roulette</h1>
      <h3>Please type in your location and press start</h3>
      <FormComponent data={homeformData} setData={setHomeFormData} />
      {/* <Link to={"/game"}>Start Here</Link> */}
    </div>
  );
};

export default HomePage;
