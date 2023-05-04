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
    cuisine: "",
  });

  const [uniqueId, setUniqueId] = useState("");

  async function createLink(event) {
    event.preventDefault();
    const gameCollection = collection(db, 'games');
    const docRef = await addDoc(gameCollection, { location: homeformData.location, price: homeformData.price, cuisine: homeformData.cuisine } );
    setUniqueId(docRef.id);
    await navigateToPlayerSelectPage(docRef.id);
  }

  async function navigateToPlayerSelectPage(gameId) {
    window.location.href = `/game/${gameId}/playerselect`;
  }

  return (
    <div className="home">
      <h1>Welcome to Grub Roulette</h1>
      <h5>Please type in your location and press start</h5>
      <FormComponent data={homeformData} setData={setHomeFormData} onSubmit={createLink} />
      <button onClick={createLink}>Start Here</button>
      {uniqueId && <PlayerSelectPage gameId={uniqueId} />}
    </div>
  );
};

export default HomePage;
