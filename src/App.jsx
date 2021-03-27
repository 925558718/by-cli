import React from 'react';
import Swiper from './components/Swiper'

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={'app'}>
        <Swiper>
          <div style={{height:'100%',width:'100%',background:'red'}}>1</div>
          <div style={{height:'100%',width:'100%',background:'yellow'}}>2</div>
          <div style={{height:'100%',width:'100%',background:'blue'}}>3</div>
        </Swiper>
      </div>

    )
  }

}


export default App;