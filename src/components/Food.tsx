import React, { useEffect, useRef, forwardRef, useState} from "react";

interface FoodProps {
    gridColumns: number;
    gridRows: number;
    headPosition: {x:number, y:number} | null;
    foodEaten: Boolean;
   // isFoodEaten: (currentPosition: { x: number; y: number }) => boolean;
    setFoodFalse: () => void;
}

// Define the type for random position
interface RandomPosition {
    x: number;
    y: number;
}

// Use forwardRef to access the ref from the parent
const Food = forwardRef<HTMLDivElement, FoodProps>(({ gridColumns, gridRows,headPosition, foodEaten,setFoodFalse}, ref) => {
    // const randomPosition: RandomPosition = {
    //     x: Math.floor(Math.random() * gridColumns) + 1, // Ensure values are 1-indexed for CSS grid
    //     y: Math.floor(Math.random() * gridRows) + 1,
    // };
    const [randomPosition, setRandomPosition] = useState<{x: number; y: number}>({
        x: Math.floor(Math.random() * gridColumns) + 1,
        y: Math.floor(Math.random() * gridRows) + 1,
    })
    

    const getRandomPosition = () => {
      //  console.log('from getRandom')
        // console.log(randomPosition);
        const newPosition = {
            x: Math.floor(Math.random() * gridColumns) + 1,
            y: Math.floor(Math.random() * gridRows) + 1,
        }
        setRandomPosition(newPosition);
        // console.log(randomPosition);
    }

    useEffect(() => {
        if (foodEaten===true){
          //  console.log(true);
            getRandomPosition();  //THIS FUCKES IT UP
        }
      //  console.log('EAT IT ');
        setFoodFalse();
    },[foodEaten])


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
