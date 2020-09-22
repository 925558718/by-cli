import React from 'react'
import Todo from '@/components/Todo'

class App extends React.Component {
    constructor(){
      super();
    }
    render() {
      return (
        <div>
            <Todo></Todo>
        </div>
      )
    }
  }

export default App;