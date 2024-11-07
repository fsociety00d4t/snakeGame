import { useState } from 'react'
import './App.css'
import GameBoard from './components/GameBoard'
import soundOf from './assets/volume_off.svg';
import soundOn from './assets/volume_up.svg';

function App() {
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [reset, setReset] = useState<boolean>(false);
  const [sound, setSound] = useState<boolean>(true);
  

  const changeGameOver = (bool:boolean) => {
    setGameOver(bool);
  }

  const changeScore = (value:number) => {
    setScore(score+value);
  }

  const changeReset = (bool: boolean) => {
    setReset(bool);
  }

  const restart = () => {
   setGameOver(false);
    changeReset(true);
    setScore(0);
  }
  return (
    <>  
      <div className='header'>
      <h1>SnakeGame</h1>
      <h2>Score : <span>{score.toString()}</span></h2>
      </div>
      <span>
        <img className='sound'src={sound ? soundOn : soundOf} 
        onClick={() => setSound(!sound)}
        style={{position:'absolute', left:'95%', top:'5%'}}></img>
      </span>
        <div className='gameBoard'>
          <div className='container' style={{border:'1px solid white', position:'relative'}}>
              <GameBoard changeGameOver={changeGameOver} score={score} changeScore={changeScore} reset={reset} changeReset={changeReset} gameOver={gameOver} sound={sound}/>
              {gameOver &&
            <div className='gameOver-container' style={{width:'50%', height:'50%',background:'black',borderRadius:'2%',position:'absolute', 
            left:'50%', top:'50%',transform:' translate(-50%, -50%)', display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center',}}>
                <h2>Game Over</h2>
                <button className='restart' onClick={restart}
                style={{border:'none', background:'none', color:'white', fontSize:'1.3em'}}>
                  Restart</button>
            </div> 
            }
          </div>       
        </div>
        
        
    </>
  )
}

export default App
