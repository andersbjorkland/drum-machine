import React from 'react';
import logo from './logo.svg';
import './App.css';

import Delete from './components/Delete';
import Display from './components/Display';
import Drumkit from './components/Drumkit';
import DrumPattern from './components/DrumPattern';
import Playback from './components/Playback';

import { connect } from 'react-redux';
import { pressedKey, timedout, deleteLast } from './redux/actions';


class App extends React.Component {
  constructor (props) {
    super(props);
    this.keyPress = this.keyPress.bind(this);
    this.downEvent = this.downEvent.bind(this);
    this.playback = this.playback.bind(this);
    this.playElement = this.playElement.bind(this);
  }

  downEvent(e) {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      this.props.timedout();
      this.props.deleteLast();
    }
  }

  keyPress(e) {
    this.props.timedout();
    let audioElement = null;
    if (this.props.appReducer.permittedKeys.includes(e.charCode)){
        audioElement = document.getElementById(String.fromCharCode(e.charCode));
        audioElement.currentTime = 0;
        audioElement.play();
        return this.props.pressedKey(e.charCode);
    } else if (this.props.appReducer.permittedKeys.includes(e.charCode-32)) {
        let number = (e.charCode-32);
        audioElement = document.getElementById(String.fromCharCode(number));
        audioElement.currentTime = 0;
        audioElement.play();
        return this.props.pressedKey(number);
    } else if (e.charCode === this.props.appReducer.spaceKey) {
        return this.props.pressedKey(e.charCode);
    }
  }

  playback(e, i) {
    if (undefined === i) {
      i = 0;
    }
    if (this.props.appReducer.pattern.length > i) {
      this.playElement(this.props.appReducer.pattern.charAt(i));
      let iteration = i + 1;
      if (this.props.appReducer.pattern.length > i+1) {
        setTimeout( () => this.playback(e, iteration), this.props.appReducer.playbackSpeed);
      }
    }
  }

  playElement(character) {
    if (character !== " ") {
      let audioElement = document.getElementById(character);
      audioElement.currentTime = 0;
      audioElement.play();
    }
  }

  render (){
    if (!this.props.appReducer.isFetching){
      document.getElementById("drum-machine").focus();
    }
    return (
      <div id="drum-machine" className="App" onKeyPress={this.keyPress} onKeyDown={this.downEvent} tabIndex="0">
        <header className="App-header">
        <img src={logo} alt="Drum Machine logo"/><h1>The Drum Machine</h1>
        </header>
        <div id="content-container">
          <div id="controls">
            <Drumkit />
            <Display />
          </div>
          <div id="playback">
            <DrumPattern />
            <Delete />
            <Playback clickFunction={this.playback} />
          </div>          
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
  timedout: () => dispatch(timedout()),
  deleteLast: () => dispatch(deleteLast())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
