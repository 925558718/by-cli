import {useMemo,useState,useContext} from 'react'
import React from 'react'
import {MyContext} from "../Context";
function Son({ name, children }) {
    const [count,high]=useState(0);
    const {setName} = useContext(MyContext)
    const TestContext=React.useContext({});
    function changeName(name) {
        console.log('change')
        return name + '改变name的方法'
    }
    const otherName =  useMemo(()=>changeName(name),[name])
    return (
        <div>
            <button onClick={()=>setName('gga')}>123</button>
            <div>{otherName}</div>
        </div>
    )
}

export default Son;