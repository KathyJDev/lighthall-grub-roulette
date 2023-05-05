import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home/home.index";
import Game from "./Pages/Game/game.index";
import GameModal from "./Pages/GameModal/modal.index";
import Final from "./Pages/Final/final.index";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlayerSelectPage from "./Pages/PlayerSelect/players.index";
import "./App.css";



function App() {
  return (
    <div className="app">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/game/:id" element={<Navigate to="playerselect" replace />} />
          <Route path="/game/:id/playerselect" element={<PlayerSelectPage />} />
          <Route path="/modal/:id" element={<GameModal />} />
          <Route path="/game/:id/final" element={<Final />} />
          {/* <Route path="/final" element={<Final />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
