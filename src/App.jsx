import React from 'react'
import Click from '@/components/click'
import vue from '@/assets/vue.jpg'
class App extends React.Component {
    constructor(){
      super()
  
    }
    render() {
      return (
        <div>
          <img src={vue}></img>
          <Click></Click>
        </div>
        
      )
    }
  }

export default App;