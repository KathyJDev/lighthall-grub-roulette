import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase-config.js';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

const Home = () => {
  const [location, setLocation] = useState("");
  const [priceInfo, setPriceInfo] = useState("");
  const [uniqueId, setUniqueId] = useState("");

  function saveLocation(event){
    setLocation(event.target.value);
  }

  function savePriceInfo(event){
    setPriceInfo(event.target.value);
  }

  async function createGame(event) {
    event.preventDefault();
    const gameCollection = collection(db, 'games');
    const docRef = await addDoc(gameCollection, { location: location, priceInfo: priceInfo } );
    setUniqueId(docRef.id);
  }

  function copyLink() {
    navigator.clipboard.writeText(`${window.location.origin}/game/${uniqueId}`)
  }

  return (
    <div className='home'>
      <h1>Welcome to Grub Roulette</h1>
      <h3>Please type in your location and press start</h3>
      <br />
      <form>

        <label htmlFor='location'>Location: </label>
        <input id='location' onChange={saveLocation}/>
        <br />

        <div>
        <label>Price Info: </label>
        <input type='radio' id='low-price' value='low-price' name="price" onChange={savePriceInfo}/>
        <label htmlFor='low-price'>$</label>
        <input type='radio' id='medium-price' value='medium-price' name="price" onChange={savePriceInfo}/>
        <label htmlFor='medium-price'>$$</label>
        <input type='radio' id='high-price' value='high-price' name="price" onChange={savePriceInfo}/>
        <label htmlFor='high-price'>$$$</label>
        </div>

        <button onClick={createGame}>Start Here</button>
      </form>

      <div>
      {uniqueId && (
        <div>
          <p>Share this link with your dining buddy:</p>
          <p>
            <a href={`${window.location.origin}/game/${uniqueId}`}>
              {`${window.location.origin}/game/${uniqueId}`}
            </a>
          </p>
          <button onClick={copyLink}>Copy Link</button>
        </div>
        )}
      </div>
    </div>
  )
}

export default Home