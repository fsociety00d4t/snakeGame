import React, {useRef, useEffect} from 'react';
import Player from "./Player";
function gameBoard() {

    const parentRef = useRef<HTMLDivElement | null>(null);

    return(
        <>
        <div 
        ref={parentRef} // Pass this ref to the child
        className="board" style={{position:'relative', width: '100vmin',
            height: '80vmin'}}>
            {/* <div className="test"></div> */}
            {/* {console.log(HTMLDivElement)} */}
            {/* @ts-ignore */}
            <Player parentRef={parentRef}/>
        </div>
        </>
    )
}

export default gameBoard;