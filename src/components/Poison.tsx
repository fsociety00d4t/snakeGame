import React, {useState, useEffect, useRef, forwardRef} from 'react';
import posion from '../assets/poison-green.svg';
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
    // const [randomPosition, setRandomPosition] = useState<{x: number; y: number}>({
    //     x: -1,
    //     y: -1,
    // })
    const [randomPosition, setRandomPosition] = useState<RandomPosition[]>([
        {x:-1, y:-1},
        // {x:12, y:15},
        // {x:13, y:15},
    ]);


    const getRandomPosition = () => {
        const newPosition = {
            x: Math.floor(Math.random() * gridColumns) + 1,
            y: Math.floor(Math.random() * gridRows) + 1,
        }
        setRandomPosition(prevPositions => [
            ...prevPositions,
            {x: newPosition.x, y: newPosition.y}
        ])

        //  setRandomPosition(newPosition);
    }

   
    useEffect(() => {
      //  console.log(randomPosition);
        if (foodEaten){
            if (score>1)
            getRandomPosition();
        } 
        setPoisonFalse();
    },[foodEaten]);

    useEffect(() => {
        // setRandomPosition({x:-1,y:-1}); COME BACK
        setRandomPosition([{x:-1,y:-1}]); 
    }, [reset]);

 /* 
  <div
          ref={ref}
          style={{
            gridRow: randomPosition.y,
            gridColumn: randomPosition.x,
            // background: 'yellow',
            position: 'relative', // Add position relative to place image inside
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
        </div> */
    return(
        <>
        {randomPosition && randomPosition.map((el,i) => {
            return (
                <div
                ref={ref}
                key={i}
                style={{
                    gridRow: el.y,
                    gridColumn: el.x,
                    // background: 'green',
                    position:'relative',
                }} 
                >
                  <img
            src={posion}
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
            )
        })}
        </>
    )

});

export default Poison;