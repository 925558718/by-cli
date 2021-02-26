import {useState,useReducer} from 'react'
import React from 'react'
import {MyContext} from "../Context";
import Son from './Son';
const reducer=(state,action)=>{
    switch (action.type) {
        case 'stepInc': return Object.assign({},state,{name:state.name+1});
        default: return state;
    }
}
function Father() {
    const [state,dispatch]=useReducer(reducer,{name:'gaga'})
    const [name, setName] = useState('名称')
    const [content,setContent] = useState('内容')
    return (
        <MyContext.Provider value={{setName,setContent}}>
            <Son name={name} content={content}></Son>
        </MyContext.Provider>
    )
}
export default Father;