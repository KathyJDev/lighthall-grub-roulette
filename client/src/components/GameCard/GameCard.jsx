import React, { useState, useRef, useMemo } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { db } from '../../../firebase-config.js';
import { collection, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TinderCard from 'react-tinder-card';
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import FinalPage from "../../Pages/Final/final.index.jsx";
import check from '../../assets/check.png';
import cross from '../../assets/cross.png';



const GameCard = (props) => {
  const { cardData, setCardData, gameId, selectedPlayer } = props;
  const [acceptedCards, setAcceptedCards] = useState([]);
  const [rejectedCards, setRejectedCards] = useState([]);
  const [finishedSelections, setFinishedSelections] = useState(false);

  const acceptFunction = async (data) => {
    setAcceptedCards([...acceptedCards, cardData.find((e) => e.id === data)]);
    setCardData(cardData.filter((e) => e.id !== data));

    const gameRef = doc(db, 'games', gameId);
    const restaurantName = cardData.find((e) => e.id === data).name;
    const restaurantLocation = cardData.find((e) => e.id === data).location.display_address;
    const restaurantPhone = cardData.find((e) => e.id === data).display_phone;
    const restaurantImage = cardData.find((e) => e.id === data).image_url;
    const restaurantRating = cardData.find((e) => e.id === data).rating;
    const restaurantURL = cardData.find((e) => e.id === data).url;
  
    const gameDoc = await getDoc(gameRef);
    const restaurantArray = gameDoc.data().restaurants || [];

    const existingRestaurantIndex = restaurantArray.findIndex((restaurant) => restaurant.name === restaurantName);
    if (existingRestaurantIndex >= 0) {
      const updatedRestaurantArray = [...restaurantArray];
      const existingRestaurant = updatedRestaurantArray[existingRestaurantIndex];
      if (!existingRestaurant.acceptedBy.includes(selectedPlayer)) {
        existingRestaurant.acceptedBy.push(selectedPlayer);
        await updateDoc(gameRef, { restaurants: updatedRestaurantArray });
      }
    } else {
      const newRestaurant = { name: restaurantName, location: restaurantLocation, phone: restaurantPhone, image: restaurantImage, rating: restaurantRating, url: restaurantURL, acceptedBy: [selectedPlayer] };
      const updatedRestaurantArray = [...restaurantArray, newRestaurant];
      await updateDoc(gameRef, { restaurants: updatedRestaurantArray });
    }

    // Check if the player has finished their selections
    if (cardData.length === 1) {
      const gameRef = doc(db, 'games', gameId);
      const gameDoc = await getDoc(gameRef);

      const finishedPlayersArray = gameDoc.data().finishedPlayers || [];

      await updateDoc(gameRef, {
        finishedPlayers: [...finishedPlayersArray, { player: selectedPlayer, finished: true }]
      });
      setFinishedSelections(true);
    }

  };

  const rejectFunction = async (data) => {
    setRejectedCards([...rejectedCards, cardData.find((e) => e.id === data)]);
    setCardData(cardData.filter((e) => e.id !== data));

    // Check if the player has finished their selections
    if (cardData.length === 1) {
      const gameRef = doc(db, 'games', gameId);
      const gameDoc = await getDoc(gameRef);

      const finishedPlayersArray = gameDoc.data().finishedPlayers || [];

      await updateDoc(gameRef, {
        finishedPlayers: [...finishedPlayersArray, { player: selectedPlayer, finished: true }]
      });
      setFinishedSelections(true);
    }
  };

  if (finishedSelections) {
    window.location.href = `/game/${gameId}/final`;
  }

  // tinder card swipe functions
  const characters = cardData
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }
  // 



  return (
    <div className="game-card">
      {/* {id && (cardData.length === 0) ?
        <div className="game-header">
          <Link to="/final"><Button size="lg" variant="success">Continue</Button></Link>
        </div>
        : (cardData.length === 0) ?
          <div className="game-header">
            <Button size="lg" variant="info" onClick={copyLink}>Share Secret Link With Friend</Button>
          </div> : ""} */}

      <div className="card-container">
        {characters.map((e) => {
          return (
            <div className="swipe">
              {/* <TinderCard
              className='swipe'
              key={e.name}
              onSwipe={(dir) => swiped(dir, e.name)}
              onCardLeftScreen={() => outOfFrame(e.name)}
            > */}
              <div className='card'>
                <h3>{e.name}</h3>
                <h6>{e.location.display_address[0]}, {e.location.display_address[1]}</h6>
                <h6>{e.location.display_address[2]}</h6>
                <h6>Contact: {e.display_phone}</h6>
                <img src={e.image_url} />
                <p>Rating: {e.rating}</p>

              </div>
              <div className="buttons">
                <img onClick={() => acceptFunction(e.id)} src={check} className="pressable button-img" />
                <img onClick={() => rejectFunction(e.id)} src={cross} className="pressable button-img" />

                {/* <IconContext.Provider value={{ color: "#2ECC71", size: "5rem", className: "pressable" }}>
                  <AiFillCheckCircle onClick={() => acceptFunction(e.id)} />
                </IconContext.Provider>
                <IconContext.Provider value={{ color: "#FF4A4A", size: "5rem", className: "pressable" }}>
                  <AiFillCloseCircle onClick={() => rejectFunction(e.id)} />
                </IconContext.Provider> */}


                {/* <Button className="pressable" onClick={() => acceptFunction(e.id)} variant="success">Accept</Button>
                <Button className="pressable" onClick={() => rejectFunction(e.id)} variant="danger">Reject</Button>  */}
              </div>

              {/* </TinderCard> */}
            </div>
          );
        })}
        <div>
        </div>
      </div>

    </div>
  );
};

export default GameCard;

// "id": "4-_AV-TK2u4dL5Y9ePhRrA",
//             "alias": "troyka-restaurant-forest-hills",
//             "name": "Troyka Restaurant",
//             "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/PSLxAx34Q5YtI2mSak8eYg/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/troyka-restaurant-forest-hills?adjust_creative=WNDQ3TaHHwg_p85Huq5Btw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=WNDQ3TaHHwg_p85Huq5Btw",
//             "review_count": 13,
//             "categories": [
//                 {
//                     "alias": "italian",
//                     "title": "Italian"
//                 }
//             ],
//             "rating": 2,
//             "coordinates": {
//                 "latitude": 40.725278,
//                 "longitude": -73.849998
//             },
//             "transactions": [],
//             "price": "$$$$",
//             "location": {
//                 "address1": "10255 Queens Blvd",
//                 "address2": "",
//                 "address3": "",
//                 "city": "Forest Hills",
//                 "zip_code": "11375",
//                 "country": "US",
//                 "state": "NY",
//                 "display_address": [
//                     "10255 Queens Blvd",
//                     "Forest Hills, NY 11375"
//                 ]
//             },
//             "phone": "+17188300500",
//             "display_phone": "(718) 830-0500",
//             "distance": 11972.561065763706
//         }
