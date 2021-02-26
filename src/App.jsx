import React from 'react'
import Father from "./components/FunctionComponent/Father";
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Father></Father>
      </div>

    )
  }

}

export default App;