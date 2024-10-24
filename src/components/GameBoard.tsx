import React, {useRef, useEffect} from 'react';
import Player from './Player';
function gameBoard() {

    const parentRef = useRef<HTMLDivElement | null>(null);
    const gridColumns = 21;
    const gridRows = 21;

    const isGameOver = (currentPosition:any) => {
       // console.log('kadaikjsd')
        console.log(currentPosition[0].x>gridColumns || currentPosition[0].y>gridRows)
        return currentPosition.x>gridColumns || currentPosition.y>gridRows; 
    
    }

    return(
        <>
        <div 
        ref={parentRef} // Pass this ref to the child
        className="board" style={{position:'relative', width: '100vmin', gridTemplateColumns: 'repeat(21, 1fr)',gridTemplateRows: 'repeat(21, 1fr)',height: '80vmin'}}>
            {/* <div className="test"></div> */}
            {/* {console.log(HTMLDivElement)} */}
            {/* @ts-ignore */}
            <Player parentRef={parentRef} isGameOver={isGameOver}/>
        </div>
        </>
    )
}

export default gameBoard;