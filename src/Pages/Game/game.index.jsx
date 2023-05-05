import axios from "axios";
import { useState, useEffect } from "react";
import { setYelpUrl } from "../../Services/api.service";
import { toast } from "react-toastify";
import GameCard from "../../components/GameCard/GameCard";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";


const GamePage = () => {
  const [fetchData, setFetchData] = useState([]);
  const queryParameters = new URLSearchParams(window.location.search);
  const locationData = queryParameters.get("location");
  const priceData = queryParameters.get("price");
  const selectedPlayer = queryParameters.get("selectedPlayer");
  const { id } = useParams();


  const searchUrl = async (locationData, priceData) => {
    const url = setYelpUrl(locationData, priceData);
    try {
      const { data } = await axios.get(url);
      setFetchData(data.data);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    searchUrl(locationData, priceData);
  }, []);


  return (
    <div className="game-container">

      <GameCard cardData={fetchData} setCardData={setFetchData} selectedPlayer={selectedPlayer} gameId={id} />
    </div>
  );
};

export default GamePage;
