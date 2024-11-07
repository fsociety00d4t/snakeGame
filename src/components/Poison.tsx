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

const Poison = forwardRef<HTMLDivElement, PoisonProps>(({ gridColumns, gridRows, headPosition, score, setPoisonFalse, foodEaten, reset}, ref) => {
    const [randomPosition, setRandomPosition] = useState<RandomPosition[]>([
        {x:-1, y:-1},
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
    }

   
    useEffect(() => {
        if (foodEaten){
            if (score>1)
            getRandomPosition();
        } 
        setPoisonFalse();
    },[foodEaten]);

    useEffect(() => {
        setRandomPosition([{x:-1,y:-1}]); 
    }, [reset]);

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
                    position:'relative',
                }} 
                >
                  <img
            src={posion}
            alt="Ice Cream"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain', 
              position: 'absolute', 
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