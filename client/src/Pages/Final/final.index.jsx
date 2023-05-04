import React, { useEffect, useState } from "react";
import { db } from "../../../firebase-config.js";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const FinalPage = () => {
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
    while (finishedPlayers.length !== 2) {
      await checkAllPlayersFinished();
      finishedPlayers = gameData.finishedPlayers || [];
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  };

  useEffect(() => {
    waitForPlayersToFinish();
  }, [gameData]);
  

  if (!gameData) {
    return <p>Loading...</p>;
  }

  if (!allPlayersFinished) {
    return <p>Waiting for other players to finish selecting...</p>;
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
    <div>
      <h1>Final Page</h1>
      {restaurantWithMostAcceptedBy ? (
        <p>The restaurant with the most acceptedBy is: {restaurantWithMostAcceptedBy.name}</p>
      ) : (
        <p>No restaurants have been accepted yet.</p>
      )}
    </div>
  );
};

export default FinalPage;