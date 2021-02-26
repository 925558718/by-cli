import React, {useState, useLayoutEffect, useEffect} from "react";
function Example() {
    const [n, setN] = useState(0)
    const onClick = ()=>{
        setN(i=>i+1)
    }
    useEffect(()=>{
        console.log("useEffect")
    })
    useLayoutEffect(()=>{ // 改成 useEffect 试试
        console.log("useLayoutEffect")
    })
    return (
        <div className="App">
            <h1>n: {n}</h1>
            <button onClick={onClick}>Click</button>
        </div>
    );
}
export default Example;