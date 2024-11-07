import React, {useRef, useEffect, useState} from 'react';
import Player from './Player';
import Food from './Food';
import Poison from './Poison';
import diedSound from '../assets/dead.mp3';

interface ParentProps {
    changeGameOver: (bool: boolean) => void;
    score: number;
    changeScore: (value: number) => void; 
    reset: boolean;
    changeReset: (bool: boolean) => void;
    gameOver: boolean;
    sound: boolean;
}

const diedAudio = new Audio(diedSound);
//const Player: React.FC<PlayerProps> = ({ parentRef, isGameOver,isFoodEaten, foodEaten}) => {
const GameBoard: React.FC<ParentProps> = ({changeGameOver, score, changeScore, reset, changeReset, gameOver, sound}) => {
    const parentRef = useRef<HTMLDivElement | null>(null);
    const foodRef = useRef<HTMLDivElement | null>(null);
    const poisonRef = useRef<HTMLDivElement | null>(null);
    const headPosition  = useRef<{x: number; y: number } | null>(null);

    const gridColumns = 21;
    const gridRows = 21;
  
    const [foodPosition,setFoodPotition] = useState<{x:Number; y:number}|null>(null);
    const [foodEaten, setFoodEaten] = useState<Boolean>(false);
    const [resetPlayer, setResetPlayer] = useState<boolean>(false);
    // const [poisonPosition,setPoisonPosition] = useState<{x:Number; y:number}|null>(null);
    const [poisonPosition, setPoisonPosition] = useState<Array<{ x: number; y: number }>>([]);

    const [poisonEaten, setPoisonEaten] = useState<boolean>(false);


    const isGameOver = (currentPosition:{x: number; y:number}, 
        allCellsPositions:{ [key: string]: {x:number, y:number}}) => {
       
       headPosition.current = {x:currentPosition.x, y:currentPosition.y};
       
       const isCollision = Object.values(allCellsPositions).some((value, index) => {
       //console.log(headPosition.current?.x);
       // console.log(index);
        if (index ===0) return false;
        return value.x === headPosition.current?.x && value.y === headPosition.current?.y;
       })

       const isOutOfBounds =(currentPosition.x > gridColumns || currentPosition.x <= 0) || (currentPosition.y > gridRows || currentPosition.y <= 0);

     //  console.log (isCollision, isOutOfBounds)
       if (isOutOfBounds || isCollision) changeGameOver(true);
       return isOutOfBounds || isCollision;
    }

    const isFoodEaten = (currentPosition: { x: number; y: number }) => {
     //   console.log(foodPosition);
        if (foodPosition) {
            if (currentPosition.x === foodPosition.x && currentPosition.y === foodPosition.y) {
                setFoodEaten(true);
                return true;
            }
        }
        return false;
    }

    const setFoodFalse = () => {
        setFoodEaten(false);
    } 

    const setPoisonFalse = () => {
        setPoisonEaten(false);
    }
    
    const changeResetPlayer = () => {
        setResetPlayer(false);  
    }

    const isPoisonEaten = (currentPosition: { x: number; y: number }) => {
        //console.log(poisonPosition);
        //   console.log(foodPosition);
           if (poisonPosition) {
         //   console.log(poisonPosition);
            //    if (currentPosition.x === poisonPosition.x && currentPosition.y === poisonPosition.y) {
            //        changeGameOver(true);
            //        return true;
            //    }
            for (const position of poisonPosition) {
                if (currentPosition.x === position.x && currentPosition.y===position.y) {
                    changeGameOver(true);
                    return true; 
                }
            }
           }
           return false;
       }

    useEffect(()=> {
        //console.log(poisonPosition)
        if (foodRef.current) {
        //    console.log(foodRef.current);
            const computedStyle = getComputedStyle(foodRef.current);
            setFoodPotition({x:Number(computedStyle.gridColumn), y:Number(computedStyle.gridRow)})
            if (foodEaten) {
                changeScore(1);
            }
           
        }   
    },[foodEaten, reset]);

    useEffect(()=> {
        if (poisonRef.current) {
            const computedStyle = getComputedStyle(poisonRef.current);
            const newPosition = { x: Number(computedStyle.gridColumn), y: Number(computedStyle.gridRow) };
            // setPoisonPosition({x:Number(computedStyle.gridColumn), y:Number(computedStyle.gridRow)})
           //let newPosition = {x:Number(computedStyle.gridColumn), y:Number(computedStyle.gridRow)};
          //  setPoisonPosition(prevPosition => [...prevPosition, newPosition]);
          setPoisonPosition(prevPositions => {
            const positionExists = prevPositions.some(
                pos => pos.x === newPosition.x && pos.y === newPosition.y
            );

            // Only add newPosition if it doesn't already exist
            if (!positionExists) {
                return [...prevPositions, newPosition];
            }
            return prevPositions;
        });
        }
    },[foodEaten]);

    useEffect(() => {
        if (reset) {
            setResetPlayer(true);
            changeReset(false);
            setPoisonPosition([]);
        }
    },[reset]);

    useEffect(() => {
        if (gameOver===true) {
            sound ?diedAudio.play() : null;
        }
    },[gameOver]);

    return(
        <>
        
        <div 
        ref={parentRef} 
        className="board" style={{position:'relative', width: '100vmin', gridTemplateColumns: 'repeat(21, 1fr)',gridTemplateRows: 'repeat(21, 1fr)',height: '80vmin'}}>
            {/* @ts-ignore */}
            <Player parentRef={parentRef} isGameOver={isGameOver} isFoodEaten={isFoodEaten} foodEaten={foodEaten} resetPlayer={resetPlayer} 
            changeResetPlayer={changeResetPlayer} gameOver={gameOver} isPoisonEaten={isPoisonEaten} score={score}/>
            <Food gridColumns={gridColumns} gridRows={gridRows} ref={foodRef} headPosition={headPosition.current} foodEaten={foodEaten} setFoodFalse={setFoodFalse} reset={reset} poisonPosition={poisonPosition} sound={sound}/>
            <Poison gridColumns={gridColumns} gridRows={gridRows} ref={poisonRef} headPosition={headPosition.current} score={score} setPoisonFalse={setPoisonFalse} foodEaten={foodEaten} reset={reset}/>
        </div>
        
        </>
    )
}

export default GameBoard;

/*
TODO: 
1. No collide food or poison with snake body
2. Finish Style
3. Deploy
*/