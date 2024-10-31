import React, {useEffect, useRef, useState} from 'react';

interface PlayerProps {
    parentRef: React.RefObject<HTMLDListElement>;
    isGameOver: (currentPosition: { x: number; y: number }) => boolean;
    isFoodEaten: (currentPosition: { x: number; y: number }) => void;
    foodEaten: boolean;
    resetPlayer: true;
    changeResetPlayer: () => void;
    gameOver: boolean;
   //PlayerPosition: {x: number, y:number};
}

interface PlayerPosition {
    x: number;
    y: number;
}
    const Player: React.FC<PlayerProps> = ({ parentRef, isGameOver,isFoodEaten, foodEaten, resetPlayer, changeResetPlayer, gameOver}) => {
        const [position, setPosition] = useState<PlayerPosition[]>([
            {x:11, y:15},
            // {x:12, y:15},
            // {x:13, y:15},
        ]);
        const requestRef = useRef<number | null>(null);
        const [inputDirection, setInputDirection] = useState<PlayerPosition> ({x:0, y:0});
        // let lastTime = 0;
        let lastRenderTime = 0;
        const SPEED = 3;
        let x;

        const animate = (currentTime : number) => {
          //  let x;
           // console.log(foodEaten);
         //   console.log(isFoodEaten);
            const secondsSinceLastRender = (currentTime - lastRenderTime)/1000;
           if (secondsSinceLastRender < 1 / SPEED) 
           {
            requestRef.current = requestAnimationFrame(animate);
            return;
           }          
            const parentWidth = parentRef.current?.offsetWidth || 0;
            const parentHeight = parentRef.current?.offsetHeight || 0;
            const parentStyle = parentRef.current?.style || 0;
            const divWidth = 50; 
            const divHeight = 50;
            let boardRows;
            let boardColumns;

            lastRenderTime = currentTime;
           if (parentStyle) {
            boardRows = parentStyle.gridTemplateRows;
            boardColumns = parentStyle.gridTemplateColumns;
           }
            

            setPosition((prevPosition) => {
                
                // console.log(inputDirection);
                const updatedPosition = [...prevPosition]; // Create a copy of the array
                //console.log(updatedPosition);
                const newX = prevPosition[0].x + inputDirection.x;
                const newY = prevPosition[0].y + inputDirection.y;
                for (let i = updatedPosition.length-2; i >= 0 ; i--) {
                    updatedPosition[i+1] = {
                      //  x: updatedPosition[i].x,
                      //  y: updatedPosition[i].y
                        ...updatedPosition[i]
                    };
                }

                updatedPosition[0] = {x: newX, y: newY};

                updatedPosition[0]=({x: newX, y: newY})
               x = isGameOver(updatedPosition[0], updatedPosition);
               // console.log(x);
               // console.log(isFoodEaten);
               if (isFoodEaten)
                isFoodEaten(updatedPosition[0]);
                return updatedPosition; // Return the updated array
            }); 
            if (!x)                       
            requestRef.current = requestAnimationFrame(animate);
            // console.log(position);
          };

          useEffect(() => {
            // console.log(foodEaten);
            if (foodEaten) {
                setPosition((prevPosition) => {
                    const lastSegment = prevPosition[prevPosition.length-1];

                    return [...prevPosition, {x: lastSegment.x, y:lastSegment.y}]
                })
            }
        }, [foodEaten]);
 
        useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [inputDirection]); 

    useEffect(()=> {
        if (resetPlayer===true){
          //  console.log('reset player');
           // console.log('dkakd');
           //console.log('here');
           setPosition([{x:11, y:15}]);
           changeResetPlayer();
           //setResetPlayer(false);
        }
    },[resetPlayer]);
    

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log(gameOver);
            if (gameOver) {
                console.log(inputDirection)
                setInputDirection({x:0, y:0});
                console.log(inputDirection)
                return;
            }
            switch (event.key) {               
                case 'ArrowUp':
                    if(inputDirection.y !==0) return
                    setInputDirection({ x: 0, y: -1 });
                    break;
                case 'ArrowDown':
                    if (inputDirection.y !==0) return
                    setInputDirection({ x: 0, y: 1 });
                    break;
                case 'ArrowLeft':
                    if(inputDirection.x !==0) return
                    setInputDirection({ x: -1, y: 0 });
                    break;
                case 'ArrowRight':
                    if(inputDirection.x !==0) return
                    setInputDirection({ x: 1, y: 0 });
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [inputDirection, gameOver]);

    return (
        <>
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
            })}
        </>
    )
}

export default Player;