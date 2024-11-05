import React, { useEffect, useRef, forwardRef, useState} from "react";

interface FoodProps {
    gridColumns: number;
    gridRows: number;
    headPosition: {x:number, y:number} | null;
    foodEaten: Boolean;
    setFoodFalse: () => void;
    reset: boolean;
    poisonPosition:Array<{ x:number; y:number}>;
}
interface RandomPosition {
    x: number;
    y: number;
}

// Use forwardRef to access the ref from the parent
const Food = forwardRef<HTMLDivElement, FoodProps>(({ gridColumns, gridRows,headPosition, foodEaten,setFoodFalse, reset, poisonPosition}, ref) => {
    const [randomPosition, setRandomPosition] = useState<{x: number; y: number}>({
        x: Math.floor(Math.random() * gridColumns) + 1,
        y: Math.floor(Math.random() * gridRows) + 1,
    })
    

    const getRandomPosition = () => {
        let positionIsValid = false; // Track if the position is valid

        while (!positionIsValid) {
            const newPosition = { // Declare newPosition inside the loop
                x: Math.floor(Math.random() * gridColumns) + 1,
                y: Math.floor(Math.random() * gridRows) + 1,
            };

            // Check if the new position overlaps with any poison positions
            const positionCollidesWithPoison = poisonPosition.some(
                (poison) => poison.x === newPosition.x && poison.y === newPosition.y
            );

            // Ensure the position does not collide with poison
            positionIsValid = !positionCollidesWithPoison;
            console.log(positionIsValid);

            if (positionIsValid) {
                setRandomPosition(newPosition); // Set the valid position
            }
        }
    };

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
