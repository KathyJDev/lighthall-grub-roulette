import React, { useEffect, useState } from "react";
import { db } from "../../../firebase-config.js";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom';

const FinalPage = (props) => {
  const { id } = useParams();
  const gameRef = doc(db, "games", id);
  const [gameData, setGameData] = useState(null);
  const [allPlayersFinished, setAllPlayersFinished] = useState(false);

  const checkAllPlayersFinished = async () => {
    const gameDoc = await getDoc(gameRef);
    setGameData(gameDoc.data());
    if (
      gameDoc.exists &&
      gameDoc.data().finishedPlayers &&
      gameDoc.data().finishedPlayers.length === 2
    ) {
      setAllPlayersFinished(true);
    }
  };

  const waitForPlayersToFinish = async () => {
    let finishedPlayers = [];
    const intervalId = setInterval(async () => {
      await checkAllPlayersFinished();
      finishedPlayers = gameData.finishedPlayers || [];
      if (finishedPlayers.length === 2) {
        clearInterval(intervalId);
        setAllPlayersFinished(true);
      }
    }, 2000);
  };

  useEffect(() => {
    waitForPlayersToFinish();
  }, []);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locationData = searchParams.get('location');
  const priceData = searchParams.get('price');
  const selectedPlayer = searchParams.get('selectedPlayer');

  function copyLink() {
    toast.info("Copied!");
    console.log(selectedPlayer)
    console.log(locationData)
    console.log(priceData)
    if (selectedPlayer === "player1"){
      navigator.clipboard.writeText(`${window.location.origin}/game/${id}?location=${locationData}&price=${priceData}&selectedPlayer=player2`)
    } else if (props.selectedPlayer === "player2"){
      navigator.clipboard.writeText(`${window.location.origin}/game/${id}?location=${locationData}&price=${priceData}&selectedPlayer=player1`)
    }
  }
  

  if (!allPlayersFinished) {
    return (
      <div className="waiting-for-players">
      <p>Waiting for all players to finish selecting...</p>
      <Player
        src="https://lottie.host/b985eb8b-3144-403d-9bfe-648398293810/We2wBFziNC.json"
        className="player"
        loop
        autoplay
      />
      <button onClick={copyLink}>Copy Share Link</button>
      </div>
    );
  }

  const restaurantArray = gameData.restaurants || [];

  let restaurantWithMostAcceptedBy = { name: "" };
  let maxAcceptedBy = 0;
  
  // Make the final decision only if all players have finished selecting
  if (allPlayersFinished) {
    restaurantArray.reduce((acc, restaurant) => {
      if (restaurant.acceptedBy.length > maxAcceptedBy) {
        restaurantWithMostAcceptedBy = restaurant;
        maxAcceptedBy = restaurant.acceptedBy.length;
      } else if (restaurant.acceptedBy.length === maxAcceptedBy) {
        // If there are multiple restaurants with the same amount of acceptedBy,
        // choose one randomly by assigning a new restaurant to acc
        if (Math.random() < 0.5) {
          acc = restaurant;
        }
      }
      return acc;
    }, null);
  }

  return (
    <div className="final-decision">
      <h1>Final Restaurant Decision: </h1>
      {restaurantWithMostAcceptedBy ? (
        <>
        <div className='card'>
        <h3>{restaurantWithMostAcceptedBy.name}</h3>
        <h6>{restaurantWithMostAcceptedBy.location[0]}, {restaurantWithMostAcceptedBy.location[1]}</h6>
        <h6>{restaurantWithMostAcceptedBy.location[2]}</h6>
        <h6>Contact: {restaurantWithMostAcceptedBy.phone}</h6>
        <img src={restaurantWithMostAcceptedBy.image} />
        <p>Rating: {restaurantWithMostAcceptedBy.rating}</p>
        </div>
        <h5>Learn more about the restaurant here: </h5>
        <a className="anchor" href={restaurantWithMostAcceptedBy.url} target="_blank" rel="noopener noreferrer">{restaurantWithMostAcceptedBy.url}</a>
        </>
      ) : (
        <p>No restaurants have been accepted yet.</p>
      )}
    </div>
  );
};

export default FinalPage;