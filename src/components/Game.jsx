import React from 'react'

const Game = () => {
  return (
    <div className='game-container'>
      <div className='card-container'>
        <div className='card-img'>
          <img src='https://img.freepik.com/free-photo/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg?w=996&t=st=1682972306~exp=1682972906~hmac=efc268b848f71daf541c8bfb18585840bb0621f1d8f62eaa80657bc1b5a91375' />
        </div>
        <div className='card-content'>
          <h3>Restaurant Name</h3>
          <h4>Location: California</h4>
          <h4>Price Info: $$$</h4>
          <p>⭐⭐⭐⭐⭐</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

      </div>

    </div>
  )
}

export default Game