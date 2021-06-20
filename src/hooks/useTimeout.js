import { useEffect, useRef } from 'react';


const useInterval=(callback,delay)=>{
    const IntervalRef=useRef();
    useEffect(()=>{
        IntervalRef.current=callback
    },[callback])
    useEffect(()=>{
        function tick(){
            IntervalRef.current()
        }
        if(delay!==null) {
            let id=setInterval(tick,delay);
            return ()=>clearInterval(id)
        }
    },[delay])
}
export default useInterval