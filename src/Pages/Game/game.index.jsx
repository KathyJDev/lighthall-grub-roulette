import axios from "axios";
import { useState, useEffect } from "react";
import { setYelpUrl } from "../../Services/api.service";
import { toast } from "react-toastify";
import GameCard from "../../components/GameCard/GameCard";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";


const GamePage = () => {
  const [fetchData, setFetchData] = useState([]);
  const queryParameters = new URLSearchParams(window.location.search);
  const locationData = queryParameters.get("location");
  const priceData = queryParameters.get("price");
  const selectedPlayer = queryParameters.get("selectedPlayer");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);


  const searchUrl = async (locationData, priceData) => {
    const url = setYelpUrl(locationData, priceData);
    try {
      const { data } = await axios.get(url);
      setFetchData(data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchUrl(locationData, priceData);
  }, []);


  return (
    <div className="game-container">
      {isLoading ? (
      <div className="waiting-for-players">
        <p color="white">Loading...</p>
        <Player
          src="https://lottie.host/b985eb8b-3144-403d-9bfe-648398293810/We2wBFziNC.json"
          className="player"
          loop
          autoplay
        />
      </div>
      ) : (
      <GameCard cardData={fetchData} setCardData={setFetchData} selectedPlayer={selectedPlayer} gameId={id} />
      )}
    </div>
  );
};

export default GamePage;
