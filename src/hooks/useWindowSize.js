import {useRef} from 'react';

export function useWindowSize(){
    const width=useRef(window.innerWidth);
    const height=useRef(window.innerHeight);

    const onResize=()=>{
        width.current=window.innerWidth;
        height.current=window.innerHeight;
    };

    window.addEventListener('resize',onResize);
    return {width,height}
}

export default useWindowSize