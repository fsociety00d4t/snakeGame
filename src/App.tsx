import { useState } from 'react'

import './App.css'
import GameBoard from './components/GameBoard'
function App() {
  
  const [gameOver, setGameOver] = useState<Boolean>(false);

  const changeGameOver = (bool:boolean) => {
    setGameOver(bool);
  }
  return (
    <>
        <h1>SnakeGame</h1>
        <h2>Score : </h2>

        <div className='gameBoard'>
          <div className='container' style={{border:'5px solid green', position:'relative'}}>
              <GameBoard changeGameOver={changeGameOver}/>
              {gameOver &&
            <div className='gameOver-container' style={{width:'50%', height:'50%',background:'black',borderRadius:'2%',position:'absolute', 
            left:'50%', top:'50%',transform:' translate(-50%, -50%)', display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center',}}>
              {/* /transform: translate(-50%, -50%); */}
                <h2>Game Over</h2>
                <button style={{border:'none', background:'none', color:'white', fontSize:'1.3em'}}>
                  Restart</button>
            </div> 
            }
          </div>       
        </div>
        
        
    </>
  )
}

export default App
