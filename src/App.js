import React from 'react';
import logo from './logo.svg';
import './App.css';

import Drumkit from './components/Drumkit';
import Display from './components/Display';

import { connect } from 'react-redux';
import { pressedKey, timedout } from './redux/actions';


class App extends React.Component {
  constructor (props) {
    super(props);
    this.keyPress = this.keyPress.bind(this);
    this.permittedKeys = [81, 87, 69, 65, 83, 68, 90, 88, 67];
  }

  keyPress(e) {
    this.props.timedout();
    let audioElement = null;
    if (this.permittedKeys.includes(e.charCode)){
        audioElement = document.getElementById(String.fromCharCode(e.charCode));
        audioElement.currentTime = 0;
        audioElement.play();
        return this.props.pressedKey(e.charCode);
    } else if (this.permittedKeys.includes(e.charCode-32)) {
        let number = (e.charCode-32);
        audioElement = document.getElementById(String.fromCharCode(number));
        audioElement.currentTime = 0;
        audioElement.play();
        return this.props.pressedKey(number);
    }
  }

  render (){
    return (
      <div id="drum-machine" className="App" onKeyPress={this.keyPress} tabIndex="0">
        <header className="App-header">
        <img src={logo} alt="Drum Machine logo"/><h1>The Drum Machine</h1>
        </header>
        <div id="content-container">
          <Drumkit />
          <Display />
        </div>
        <footer><a href="https://anders.femtearenan.se">Anders Björkland 2020</a></footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  pressedKey: (keycode) => dispatch(pressedKey(keycode)),
  timedout: () => dispatch(timedout())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
