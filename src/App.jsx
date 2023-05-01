import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import Final from "./components/Final";
import './App.css';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/game' element={<Game />} />
          <Route path='/final' element={<Final />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
