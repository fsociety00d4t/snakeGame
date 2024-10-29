import React, {useRef, useEffect, useState} from 'react';
import Player from './Player';
import Food from './Food';
function gameBoard() {
    const parentRef = useRef<HTMLDivElement | null>(null);
    const foodRef = useRef<HTMLDivElement | null>(null);
    const gridColumns = 21;
    const gridRows = 21;
   // let headPosition;

    //const [headPosition, setHeadPosition] = useState<{x:number, y:number} | null>(null);
    const headPosition  = useRef<{x: number; y: number } | null>(null);
    //const [test, setTest] = useState<{x:Number, y:number} | null> (null);
    const [foodPosition,setFoodPotition] = useState<{x:Number; y:number}|null>(null);
    const [foodEaten, setFoodEaten] = useState<Boolean>(false);


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
       return isOutOfBounds || isCollision;
    }

    const isFoodEaten = (currentPosition: { x: number; y: number }) => {
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

    useEffect(()=> {
        if (foodRef.current) {
            const computedStyle = getComputedStyle(foodRef.current);
            setFoodPotition({x:Number(computedStyle.gridColumn), y:Number(computedStyle.gridRow)})
        }   
    },[foodEaten]);

    return(
        <>
        <div 
        ref={parentRef} // Pass this ref to the child
        className="board" style={{position:'relative', width: '100vmin', gridTemplateColumns: 'repeat(21, 1fr)',gridTemplateRows: 'repeat(21, 1fr)',height: '80vmin'}}>
            {/* <div className="test"></div> */}
            {/* {console.log(HTMLDivElement)} */}
            {/* @ts-ignore */}
            <Player parentRef={parentRef} isGameOver={isGameOver} isFoodEaten={isFoodEaten} foodEaten={foodEaten}/>
            <Food gridColumns={gridColumns} gridRows={gridRows} ref={foodRef} headPosition={headPosition.current} foodEaten={foodEaten} setFoodFalse={setFoodFalse}/>
        </div>
        
        </>
    )
}

export default gameBoard;

/*
TODO: 
1. Add GameOver
2. Add Score
3. Add Levels selection
4. Add style 
*/