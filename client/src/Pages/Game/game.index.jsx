import axios from "axios";
import { useState, useEffect } from "react";
import { setYelpUrl } from "../../Services/api.service";
import { toast } from "react-toastify";
import GameCard from "../../components/GameCard/GameCard";

const GamePage = () => {
  const [fetchData, setFetchData] = useState([]);
  const queryParameters = new URLSearchParams(window.location.search);
  const locationData = queryParameters.get("location");
  const cuisineData = queryParameters.get("cuisine");
  const priceData = queryParameters.get("price");

  const searchUrl = async (locationData, priceData, cuisineData) => {
    const url = setYelpUrl(locationData, priceData, cuisineData);
    try {
      const { data } = await axios.get(url);
      setFetchData(data.data);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    searchUrl(locationData, priceData, cuisineData);
  }, []);

  return (
    <div className="game-container">
      <GameCard cardData={fetchData} setCardData={setFetchData} />
    </div>
  );
};

export default GamePage;
