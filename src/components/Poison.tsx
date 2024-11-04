import React, {useState, useEffect, useRef, forwardRef} from 'react';

interface PoisonProps {
    gridColumns: number;
    gridRows: number;
    headPosition: {x:number, y:number} | null;
    score: number;
    setPoisonFalse: () => void;
    foodEaten: Boolean;
    reset: boolean;
}

interface RandomPosition {
    x: number;
    y: number;
}
//const Food = forwardRef<HTMLDivElement, FoodProps>(({ gridColumns, gridRows,headPosition, foodEaten,setFoodFalse}, ref) => {

const Poison = forwardRef<HTMLDivElement, PoisonProps>(({ gridColumns, gridRows, headPosition, score, setPoisonFalse, foodEaten, reset}, ref) => {
    const [randomPosition, setRandomPosition] = useState<{x: number; y: number}>({
        x: -1,
        y: -1,
    })
    

    const getRandomPosition = () => {
        const newPosition = {
            x: Math.floor(Math.random() * gridColumns) + 1,
            y: Math.floor(Math.random() * gridRows) + 1,
        }
        setRandomPosition(newPosition);
    }

   
    useEffect(() => {
        if (foodEaten){
            if (score>3)
            getRandomPosition();
        } 
        setPoisonFalse();
    },[foodEaten]);

    useEffect(() => {
        setRandomPosition({x:-1,y:-1});
    }, [reset]);

   

    return(
        <>
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