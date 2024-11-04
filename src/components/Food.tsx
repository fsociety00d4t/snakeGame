import React, { useEffect, useRef, forwardRef, useState} from "react";

interface FoodProps {
    gridColumns: number;
    gridRows: number;
    headPosition: {x:number, y:number} | null;
    foodEaten: Boolean;
    setFoodFalse: () => void;
    reset: boolean;
}
interface RandomPosition {
    x: number;
    y: number;
}

// Use forwardRef to access the ref from the parent
const Food = forwardRef<HTMLDivElement, FoodProps>(({ gridColumns, gridRows,headPosition, foodEaten,setFoodFalse, reset}, ref) => {
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

    useEffect(() => {
        if (foodEaten===true){
            getRandomPosition();  //THIS FUCKES IT UP
        }
        setFoodFalse();
    },[foodEaten])

    useEffect(() => {
        if (reset===true) {
            getRandomPosition();
        }
    },[reset]);


    return (
        <div
            ref={ref}
            style={{
                gridRow: randomPosition.y,
                gridColumn: randomPosition.x,
                background: 'yellow',
            }}
        />
    );
});

// Set display name for better debugging
Food.displayName = 'Food';

export default Food;
