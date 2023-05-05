import { Link } from "react-router-dom";
import FormComponent from "../../components/Form/Form";
import { useState } from "react";
import { db } from "../../../firebase-config.js";
import { collection, addDoc } from "firebase/firestore";
import PlayerSelectPage from "../PlayerSelect/players.index";

const HomePage = () => {
  const [homeformData, setHomeFormData] = useState({
    location: "",
    price: 0,
  });

  const [uniqueId, setUniqueId] = useState("");

  async function createLink(event) {
    event.preventDefault();
    const gameCollection = collection(db, 'games');
    const docRef = await addDoc(gameCollection, { location: homeformData.location, price: homeformData.price} );
    setUniqueId(docRef.id);
    await navigateToPlayerSelectPage(docRef.id);
  }

  async function navigateToPlayerSelectPage(gameId) {
    window.location.href = `/game/${gameId}/playerselect`;
  }

  return (
    <div className="home">
      <div className="home-content">
        <span>Welcome to</span><h1> Grub Roulette</h1>
        <FormComponent data={homeformData} setData={setHomeFormData} createLink={createLink}/>
      {uniqueId && <PlayerSelectPage gameId={uniqueId} />}
      </div>
      <img src="./home-page-img.png" />


    </div>
  );
};

export default HomePage;
