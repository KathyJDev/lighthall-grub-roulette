import axios from "axios";
import { useState, useEffect } from "react";
import { setYelpUrl } from "../../Services/api.service";
import { toast } from "react-toastify";
import GameCard from "../../components/GameCard/GameCard";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";

const GamePage = () => {
  const [fetchData, setFetchData] = useState([]);
  const [uniqueId, setUniqueId] = useState("");
  const queryParameters = new URLSearchParams(window.location.search);
  const locationData = queryParameters.get("location");
  const cuisineData = queryParameters.get("cuisine");
  const priceData = queryParameters.get("price");
  const { id } = useParams();


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


  function copyLink() {
    setUniqueId("xyz"); //test
    toast.info("Copied!");
    navigator.clipboard.writeText(`${window.location.origin + "/modal/"}${uniqueId + "?location=" + locationData + "&price=" + priceData}`);
  }

  return (
    <div className="game-container">
      {id ? "" : <div className="game-header">
        <Button size="lg" variant="info" onClick={copyLink}>Share Secret Link With Friend</Button>
      </div>}

      <GameCard cardData={fetchData} setCardData={setFetchData} />
    </div>
  );
};

export default GamePage;
