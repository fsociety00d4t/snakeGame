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
    const isGameOver = (currentPosition:{x: number; y:number}) => {
       headPosition.current = {x:currentPosition.x, y:currentPosition.y};
    //    setTest(({ x: currentPosition.x, y: currentPosition.y }));
     // console.log(headPosition);

       // console.log(headPosition);
    //    console.log( currentPosition.x>gridColumns || currentPosition.y>gridRows)
    // isFoodEaten();
        return currentPosition.x>gridColumns || currentPosition.y>gridRows; 
    }

    const isFoodEaten = (currentPosition:{x: number; y:number}) => {
       console.log(foodPosition);
        // console.log('called??????')
      //  console.log(headPosition);
      //console.log(foodPosition, currentPosition);
        
        
        if (foodPosition)
        if (currentPosition.x === foodPosition.x && currentPosition.y === foodPosition.y){
         //   console.log('eaten');
            setFoodEaten(true);
          //  console.log(foodEaten);
        }
        // setFoodEaten(false);
    }

    const setFoodFalse = () => {
        setFoodEaten(false);
    }

    const logFoodRef = () => {
        // if (foodRef.current) {
        //     console.log('Food Ref:', foodRef.current);
        //     const computedStyle = getComputedStyle(foodRef.current);
        //     console.log('Food Background Color:', computedStyle.backgroundColor);
        //     console.log('Food Position:', computedStyle.gridRow, computedStyle.gridColumn);
        // } else {
        //     console.log('Food ref is null');
        // }
        if (foodRef.current) {
            console.log(foodPosition);
            console.log('setting');
         //   console.log('aksks')
            const computedStyle = getComputedStyle(foodRef.current);
            setFoodPotition({x:Number(computedStyle.gridColumn), y:Number(computedStyle.gridRow)})
            console.log(foodPosition);
        }     
    };

    // logFoodRef();
    useEffect(()=> {
        logFoodRef();
    },[foodEaten]);

    // useEffect(() => {
    //     //console.log(foodRef.current.style);
    //     console.log(headPosition);
    // },[test])

    return(
        <>
        <div 
        ref={parentRef} // Pass this ref to the child
        className="board" style={{position:'relative', width: '100vmin', gridTemplateColumns: 'repeat(21, 1fr)',gridTemplateRows: 'repeat(21, 1fr)',height: '80vmin'}}>
            {/* <div className="test"></div> */}
            {/* {console.log(HTMLDivElement)} */}
            {/* @ts-ignore */}
            <Player parentRef={parentRef} isGameOver={isGameOver} isFoodEaten={isFoodEaten}/>
            <Food gridColumns={gridColumns} gridRows={gridRows} ref={foodRef} headPosition={headPosition.current} foodEaten={foodEaten} setFoodFalse={setFoodFalse}/>
        </div>
        
        </>
    )
}

export default gameBoard;

/*
TODO: 
1.GET THE CORRECT FOOD POSITION ON GAMEBOARD
2.GET NEW RANDOM VALUE ON FOOD COMPONENT EVERYTIME PLAYER EATS IT
3.GET THE PLAYER BIGGER BASED ON HIS FOOD CONSUMTION
*/