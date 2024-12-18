import React, { useEffect, useRef, forwardRef, useState} from "react";
import eatSound from '../assets/eat.mp3';
import iceCream from '../assets/ice-cream.svg';
import lunch from '../assets/lunch.svg';
import cake from '../assets/cake.svg';
import bakery from '../assets/bakery.svg'

interface FoodProps {
    gridColumns: number;
    gridRows: number;
    headPosition: {x:number, y:number} | null;
    foodEaten: Boolean;
    setFoodFalse: () => void;
    reset: boolean;
    poisonPosition:Array<{ x:number; y:number}>;
    sound: boolean;
}
interface RandomPosition {
    x: number;
    y: number;
}

const randomFood = [iceCream, lunch, cake, bakery];

const eatAudio = new Audio(eatSound);
const Food = forwardRef<HTMLDivElement, FoodProps>(({ gridColumns, gridRows,headPosition, foodEaten,setFoodFalse, reset, poisonPosition, sound}, ref) => {
    const [randomPosition, setRandomPosition] = useState<{x: number; y: number}>({
        x: Math.floor(Math.random() * gridColumns) + 1,
        y: Math.floor(Math.random() * gridRows) + 1,
    })
    const [randomImg, setRandomImg] = useState<number>(0);
    
    const getRandomImg = () => {
        let random = Math.floor(Math.random() * randomFood.length);
        setRandomImg(random);
    }
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
          // console.log(positionIsValid);
          if (positionIsValid) {
              setRandomPosition(newPosition); 
          }
      }
  };

    useEffect(() => {
        if (foodEaten===true){
            sound ? eatAudio.play() : null;
            getRandomImg();
            getRandomPosition();  
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
            position: 'relative', 
          }}
        >
          <img
            src={randomFood[randomImg]}
            alt="Ice Cream"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain', // Ensure the image fits within the div without distortion
              position: 'absolute', // Position absolute to keep the image inside the div
              top: '0',
              left: '0',
            }}
          />
        </div>
      );
    }
  );

// Set display name for better debugging
Food.displayName = 'Food';

export default Food;
