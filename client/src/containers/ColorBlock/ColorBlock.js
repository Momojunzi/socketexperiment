import React, {Component} from 'react';
import openSocket from 'socket.io-client';

class ColorBlock extends Component {
  state = {
    color: this.props.color,
    newColor: '',
    socket: ''
  }

  componentDidMount() {
    this.socket();

  }

  getNewColor = (event) => {
    this.setState({newColor: event.target.value})
  }

  socket = () =>{
    
    const socket = openSocket(`http://localhost:3001`);
    this.setState({socket}, ()=>{
      this.socketListener();
    })
  }

  socketEvents = () => {
    this.state.socket.emit('color', this.state.newColor);
  }

  socketListener = () => {
    this.state.socket.on("color", (color)=>{
      this.setState({color: color});
    })
  }

  render() {
    const blockColor = {
      backgroundColor: this.state.color
    }
    return (
      <div className="colorBlock col-4" style={blockColor}>
        <div className="row justify-content-center numberRow">
          <p>{this.props.blockNumber}</p>
        </div>
        <div className="row justify-content-center inputRow">
          <input
                 type="text"
                 placeholder="enter a color here"
                 className="col-6 input"
                 onChange={this.getNewColor}
         />
        </div>
        <div className="row justify-content-center btnRow">
          <button className="btn btn-sm submitBtn col-6" onClick={this.socketEvents}>submit color</button>
        </div>
      </div>
    )
  }
}

export default ColorBlock;
