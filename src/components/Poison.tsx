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
    {position.map((el, i) => {
                // console.log(`Position ${i}:`, el); // Log the position object and its index
                return (
                    <div
                        key={i}
                        style={{
                            gridRow: el.y,
                            gridColumn: el.x,
                            border: '.25vmin solid black',
                            background: i===0 ? 'red': 'blue',
                        }}
                    />
                );
            })} */
   

    return(
        <>
        {/* <div
            ref={ref}
            style={{
                gridRow: randomPosition.y,
                gridColumn: randomPosition.x,
                background: 'green',
            }}
        /> */}
        {randomPosition && randomPosition.map((el,i) => {
            return (
                <div
                ref={ref}
                key={i}
                style={{
                    gridRow: el.y,
                    gridColumn: el.x,
                    background: 'green',
                }}
                />
            )
        })}
        </>
    )

});

export default Poison;