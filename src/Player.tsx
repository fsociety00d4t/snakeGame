import React, {useEffect, useRef, useState} from 'react';

interface PlayerProps {
    parentRef: React.RefObject<HTMLDListElement>;
}
    const Player: React.FC<PlayerProps> = ({ parentRef }) => {
        const [position, setPosition] = useState<number>(0);
        const requestRef = useRef<number | null>(null);
  
        const animate = () => {
            const parentWidth = parentRef.current?.offsetWidth || 0;
            const divWidth = 50; 
            setPosition((prevPosition) => (prevPosition + 1) % (parentWidth - divWidth));
            requestRef.current = requestAnimationFrame(animate);
          };

        useEffect(() => {
           // console.log(parentRef);
           
            requestRef.current = requestAnimationFrame(animate);
            console.log('here');
            return () => {
                if (requestRef.current) {
                    cancelAnimationFrame(requestRef.current);
                }
            }
        },[parentRef]);

    return(
        <>
        <div 
        style={{left: position, position:'absolute', width:'20px', height:'20px', background:'blue'}}></div>
        </>
    )
}

export default Player;