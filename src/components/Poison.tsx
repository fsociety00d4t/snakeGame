import React, {useState, useEffect, useRef, forwardRef} from 'react';

interface PoisonProps {
    gridColumns: number;
    gridRows: number;
    headPosition: {x:number, y:number} | null;
    score: number;
    setPoisonFalse: () => void;
    foodEaten: Boolean;
}

interface RandomPosition {
    x: number;
    y: number;
}
//const Food = forwardRef<HTMLDivElement, FoodProps>(({ gridColumns, gridRows,headPosition, foodEaten,setFoodFalse}, ref) => {

const Poison = forwardRef<HTMLDivElement, PoisonProps>(({ gridColumns, gridRows, headPosition, score, setPoisonFalse, foodEaten}, ref) => {
    const [randomPosition, setRandomPosition] = useState<{x: number; y: number}>({
        x: Math.floor(Math.random() * gridColumns) + 1,
        y: Math.floor(Math.random() * gridRows) + 1,
    })
    

    const getRandomPosition = () => {
        const newPosition = {
            x: Math.floor(Math.random() * gridColumns) + 1,
            y: Math.floor(Math.random() * gridRows) + 1,
        }
        setRandomPosition(newPosition);
    }

    /* 
    useEffect(() => {
        if (foodEaten===true){
            getRandomPosition();  //THIS FUCKES IT UP
        }
        setFoodFalse();
    },[foodEaten])
    */
   
    useEffect(() => {
        //getRandomPosition();
        if (foodEaten){
            console.log('got it');
            getRandomPosition();
        } 
        setPoisonFalse();
    },[foodEaten]);

    //console.log(score);

    return(
        <>
        {/* {console.log(randomPosition)}; */}
        <div
            ref={ref}
            style={{
                gridRow: randomPosition.y,
                gridColumn: randomPosition.x,
                background: 'green',
            }}
        />
        </>
    )

});

export default Poison;