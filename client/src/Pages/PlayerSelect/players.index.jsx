import { useState, useEffect } from "react";
import spoon from '../../assets/spoon.png';
import fork from '../../assets/fork.png';
import { Link, useParams } from 'react-router-dom';
import { db } from "../../../firebase-config.js";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const PlayerSelectPage = () => {

    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const { id } = useParams();

    useEffect(() => {
        async function fetchGameData() {
          const gameDocRef = doc(db, "games", id);
          const gameDoc = await getDoc(gameDocRef);
          if (gameDoc.exists()) {
            const { location: gameLocation, price: gamePrice} = gameDoc.data();
            setLocation(gameLocation);
            setPrice(gamePrice);
          }
        }

        fetchGameData();
      }, [id]);

    function copyLink() {
        toast.info("Copied!");
        navigator.clipboard.writeText(`${window.location.origin}/game/${id}`);
    }

    return (
        <div className="player-select">
        <button onClick={copyLink}>Copy Share Link</button>
        <h1>Choose Player</h1>
        <div className="icon-fork-and-spoon">
            <div className="icon-group">
            <div className="icon">
                <div className="icon-back">
                <Link to={`/game/${id}?location=${location}&price=${price}&selectedPlayer=player1`}>
                <img
                    src={spoon}
                    alt="Not Found"
                    className="vector"
                />
                </Link>
                </div>
                <p className="player">Player 1</p>
            </div>
            <div className="icon">
                <div className="icon-back">
                <Link to={`/game/${id}?location=${location}&price=${price}&selectedPlayer=player2`}>
                <img
                    src={fork}
                    alt="Not Found"
                    className="vector"
                />
                </Link>
                </div>
                <p className="player">Player 2</p>
            </div>
            </div>
        </div>
        </div>
    );
};

export default PlayerSelectPage;