import React, { Component } from 'react';
import axios from 'axios';
import ColorBlock from './containers/ColorBlock/ColorBlock'

import './App.css';

class App extends Component {
  state = {
    experiment: 'test'
  }
  componentDidMount() {
    this.getTest();
  }

  getTest = () => {
    axios.get('/api/test')
      .then(response => {
        console.log(response);
        const experiment = response.data;
        this.setState({experiment});
      })
  }
  render() {
    return (
      <div className="App container">
        <p>{this.state.experiment}</p>
        <div className="row justify-content-center blockRow" >
          <ColorBlock blockNumber="1" color="red"/>
          <ColorBlock blockNumber="2" color="orange"/>
          <ColorBlock blockNumber="3" color="yellow"/>
        </div>
        <div className="row justify-content-center blockRow" >
          <ColorBlock blockNumber="4" color="green"/>
          <ColorBlock blockNumber="5" color="blue"/>
          <ColorBlock blockNumber="6" color="indigo"/>
        </div>
      </div>
    );
  }
}

export default App;
