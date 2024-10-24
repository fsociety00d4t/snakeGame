import { useState } from 'react'

import './App.css'
import GameBoard from './components/GameBoard'
function App() {
  

  return (
    <>
        <h1>SnakeGame</h1>
        <h2>Score : </h2>

        <div className='gameBoard'>
          <GameBoard />
        </div>
    </>
  )
}

export default App
