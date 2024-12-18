import React, {useEffect, useRef, useState} from 'react';
import snakeHead from '../assets/snake-head.svg';
interface PlayerProps {
    parentRef: React.RefObject<HTMLDivElement>;
    isGameOver: (currentPosition: { x: number; y: number }, allCellsPositions: { x: number; y: number }[]) => boolean;
    isFoodEaten: (currentPosition: { x: number; y: number }) => void;
    foodEaten: boolean;
    resetPlayer: boolean;
    changeResetPlayer: () => void;
    gameOver: boolean;
    isPoisonEaten: (currentPosition: {x: number; y:number}) => boolean;
    score: number;
}

interface PlayerPosition {
    x: number;
    y: number;
}
    const Player: React.FC<PlayerProps> = ({ parentRef, isGameOver,isFoodEaten, foodEaten, resetPlayer, changeResetPlayer, gameOver, isPoisonEaten, score}, ref) => {
        const [position, setPosition] = useState<PlayerPosition[]>([
            {x:11, y:15},
        ]);
        const requestRef = useRef<number | null>(null);
        const [inputDirection, setInputDirection] = useState<PlayerPosition> ({x:0, y:0});
        let lastRenderTime = 0;
        let x;

        const calculateSpeed = () => {
            const baseSpeed = 5;
            const speedIncrement = 0.5;
            return baseSpeed + speedIncrement * Math.floor(score/2);
        }

        const animate = (currentTime : number) => {
            const secondsSinceLastRender = (currentTime - lastRenderTime)/1000;
            const SPEED = calculateSpeed();
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
                
                const updatedPosition = [...prevPosition]; // Create a copy of the array
                const newX = prevPosition[0].x + inputDirection.x;
                const newY = prevPosition[0].y + inputDirection.y;
                for (let i = updatedPosition.length-2; i >= 0 ; i--) {
                    updatedPosition[i+1] = {
                        ...updatedPosition[i]
                    };
                }
                updatedPosition[0]=({x: newX, y: newY})
                

               x = isGameOver(updatedPosition[0], updatedPosition);
               if (isFoodEaten)
                isFoodEaten(updatedPosition[0]);
               if (isPoisonEaten)
                isPoisonEaten(updatedPosition[0]);
                return updatedPosition; // Return the updated array
            }); 
            if (!x)                       
            requestRef.current = requestAnimationFrame(animate);
          };

          useEffect(() => {
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

    useEffect(() => {
        setInputDirection({x:0, y:0});
    }, [gameOver]);


    useEffect(()=> {
        if (resetPlayer===true){
           setPosition([{x:11, y:15}]);
           changeResetPlayer();
        }
    },[resetPlayer]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (gameOver) {
                setInputDirection({x:0, y:0});
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
            return (
                <div
                    key={i}
                    style={{
                        gridRow: el.y,
                        gridColumn: el.x,
                        background: i === 0 ? '' : '#006400', 
                        position: 'relative',
                        borderRadius:'40%',
                        border: i === 0 ? 'none': '1px solid #005600',
                    }}
                >
                    {i === 0 && (
                        <img
                            src={snakeHead}
                            alt="Snake Head"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain', 
                                position: 'absolute',
                                top:'0',
                                left:'0',
                            }}
                        />
                    )}
                </div>
            );
        })}
    </>
    )
}

export default Player;