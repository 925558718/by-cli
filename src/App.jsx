import React from 'react'
import Todo from '@/components/Todo'
import Vue from '@/assets/vue.jpg'
class App extends React.Component {
    constructor(){
      super();
    }
    render() {
      return (
        <div>
            <img style={{height:20+'px',height:20+'px'}}  src={Vue}></img>
            <Todo></Todo>
        </div>
      )
    }
  }

export default App;