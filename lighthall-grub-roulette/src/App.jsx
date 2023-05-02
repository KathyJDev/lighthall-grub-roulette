import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/home.index";
import Game from "./Pages/Game/game.index";
// import Final from "./Pages/Final/final.index";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          {/* <Route path="/final" element={<Final />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
