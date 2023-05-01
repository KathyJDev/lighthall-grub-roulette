import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
      <h1>Welcome to Grub Roulette</h1>
      <h3>Please type in your location and press start</h3>
      <br />
      <form>

        <label htmlFor='location'>Location: </label>
        <input id='location' />
        <br />

        <label>Price Info: </label>
        <input type='checkbox' id='low-price' />
        <input type='checkbox' id='low-price' />
        <input type='checkbox' id='low-price' />



        <button><Link to={"/game"}>Start Here</Link></button>
      </form>
    </div>
  )
}

export default Home