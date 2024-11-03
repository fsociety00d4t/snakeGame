import React, {useRef, useEffect, useState} from 'react';
import Player from './Player';
import Food from './Food';
import Poison from './Poison';

interface ParentProps {
    changeGameOver: (bool: boolean) => void;
    score: number;
    changeScore: (value: number) => void; 
    reset: boolean;
    changeReset: (bool: boolean) => void;
    gameOver: boolean;
}
//const Player: React.FC<PlayerProps> = ({ parentRef, isGameOver,isFoodEaten, foodEaten}) => {
const GameBoard: React.FC<ParentProps> = ({changeGameOver, score, changeScore, reset, changeReset, gameOver}) => {
    const parentRef = useRef<HTMLDivElement | null>(null);
    const foodRef = useRef<HTMLDivElement | null>(null);
    const poisonRef = useRef<HTMLDivElement | null>(null);
    const gridColumns = 21;
    const gridRows = 21;
   // let headPosition;

    //const [headPosition, setHeadPosition] = useState<{x:number, y:number} | null>(null);
    const headPosition  = useRef<{x: number; y: number } | null>(null);
    //const [test, setTest] = useState<{x:Number, y:number} | null> (null);
    const [foodPosition,setFoodPotition] = useState<{x:Number; y:number}|null>(null);
    const [foodEaten, setFoodEaten] = useState<Boolean>(false);
    const [resetPlayer, setResetPlayer] = useState<boolean>(false);
    const [poisonPosition,setPoisonPosition] = useState<{x:Number; y:number}|null>(null);
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
        //   console.log(foodPosition);
           if (poisonPosition) {
            console.log(poisonPosition);
               if (currentPosition.x === poisonPosition.x && currentPosition.y === poisonPosition.y) {
                   changeGameOver(true);
                   return true;
               }
           }
           return false;
       }

    useEffect(()=> {
        if (foodRef.current) {
        //    console.log(foodRef.current);
            const computedStyle = getComputedStyle(foodRef.current);
            setFoodPotition({x:Number(computedStyle.gridColumn), y:Number(computedStyle.gridRow)})
            if (foodEaten) {
                changeScore(1);
            }
           
        }   
    },[foodEaten]);

    useEffect(()=> {
        // console.log(poisonRef.current);
        if (poisonRef.current) {
           console.log(poisonRef.current);
            const computedStyle = getComputedStyle(poisonRef.current);
            setPoisonPosition({x:Number(computedStyle.gridColumn), y:Number(computedStyle.gridRow)})
          //  setPoisonEaten(false);
        }
    },[foodEaten]);

    // useEffect(() => {
    //     if (poisonEaten) {
    //         setPoisonEaten(false);
    //     }
    // },[poisonEaten])

    useEffect(() => {
       // console.log(reset);
        if (reset) {
            setResetPlayer(true);
            changeReset(false);
        }
    },[reset]);

    return(
        <>
        
        <div 
        ref={parentRef} // Pass this ref to the child
        className="board" style={{position:'relative', width: '100vmin', gridTemplateColumns: 'repeat(21, 1fr)',gridTemplateRows: 'repeat(21, 1fr)',height: '80vmin'}}>
            {/* <div className="test"></div> */}
            {/* {console.log(HTMLDivElement)} */}
            {/* @ts-ignore */}
            <Player parentRef={parentRef} isGameOver={isGameOver} isFoodEaten={isFoodEaten} foodEaten={foodEaten} resetPlayer={resetPlayer} 
            changeResetPlayer={changeResetPlayer} gameOver={gameOver} isPoisonEaten={isPoisonEaten}/>
            <Food gridColumns={gridColumns} gridRows={gridRows} ref={foodRef} headPosition={headPosition.current} foodEaten={foodEaten} setFoodFalse={setFoodFalse}/>
            <Poison gridColumns={gridColumns} gridRows={gridRows} ref={poisonRef} headPosition={headPosition.current} score={score} setPoisonFalse={setPoisonFalse} foodEaten={foodEaten}/>
        </div>
        
        </>
    )
}

export default GameBoard;

/*
TODO: 
3. Add poison
4. Add style 
*/