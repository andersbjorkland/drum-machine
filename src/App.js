import React from 'react';
import logo from './logo.svg';
import './App.css';

import Delete from './components/Delete';
import Reset from './components/Reset';
import Display from './components/Display';
import Drumkit from './components/Drumkit';
import DrumPattern from './components/DrumPattern';
import PlaybackPlay from './components/PlaybackPlay';
import PlaybackStop from './components/PlaybackStop';
import PlaybackPause from './components/PlaybackPause';

import { connect } from 'react-redux';
import { pressedKey, timedout, deleteLast, playOn, playStop, playPause, playbackCharacter } from './redux/actions';


class App extends React.Component {
  constructor (props) {
    super(props);
    this.drumRef = React.createRef();
    this.keyPress = this.keyPress.bind(this);
    this.downEvent = this.downEvent.bind(this);
    this.playback = this.playback.bind(this);
    this.playElement = this.playElement.bind(this);
    this.startPlayback = this.startPlayback.bind(this);
    this.stopPlayback = this.stopPlayback.bind(this);
    this.pausePlayback = this.pausePlayback.bind(this);
    this.playbackIndex = 0;
  }

  downEvent(e) {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      this.props.timedout(300);
      this.props.deleteLast();
    } else if (e.key === 'Enter') {
      if (this.props.appReducer.playback) {
        this.pausePlayback();
      } else {
        this.startPlayback();
      }
    }
  }

  keyPress(e) {
    this.props.timedout(300);
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

  stopPlayback() {
    setTimeout( () => this.props.playbackCharacter(""), this.props.appReducer.playbackSpeed);
    this.props.playStop();
  }

  startPlayback() {
    this.props.playOn();
    this.playback();
  }

  pausePlayback() {
    this.props.playPause(this.playbackIndex);
  }

  playback(e, i) {
    let shouldPlay = this.props.appReducer.playback;
    if (undefined === i) {
      i = this.props.appReducer.playbackIndex;
      shouldPlay = true;
    }
    
    if (this.props.appReducer.pattern.length > i && shouldPlay ) {
      this.playbackIndex = i;
      let playbackCharacter = this.props.appReducer.pattern.charAt(i);
      this.props.playbackCharacter(playbackCharacter);
      this.playElement(playbackCharacter);
      let iteration = i + 1;
      if (this.props.appReducer.pattern.length > i+1) {
        setTimeout( () => this.playback(e, iteration), this.props.appReducer.playbackSpeed);
      } else {
        this.stopPlayback();

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

  componentDidMount() {
    const machineElement = this.drumRef.current;
    machineElement.focus();
  }

  render (){
    // if (!this.props.appReducer.isFetching){
      // document.getElementById("drum-machine").focus();
    // }
    const playPauseToggler = this.props.appReducer.playback ? <PlaybackPause clickFunction={this.pausePlayback} /> : <PlaybackPlay clickFunction={this.startPlayback} />;
    return (
      <div id="drum-machine" className="App" onKeyPress={this.keyPress} onKeyDown={this.downEvent} tabIndex="0" ref={this.drumRef}>
        <header className="App-header">
        <img src={logo} alt="Drum Machine logo"/><h1>The Drum Machine</h1>
        </header>
        <div id="content-container">
          <div id="controls">
            <Drumkit />
            <Display id="1" character={this.props.appReducer.activeDrum} />
          </div>
          <div id="playback">
            <div className="playback-controls">
              {playPauseToggler}
              <PlaybackStop clickFunction={this.stopPlayback} />
            </div>
            <div id="reset-controls" className="playback-controls">
              <Delete />
              <Reset />
            </div>
            <div>
              <DrumPattern />
              <Display id="2" character={this.props.appReducer.playbackCharacter} />
            </div>
          </div>          
        </div>
        <footer><a href="https://andersbjorkland.online">Anders Björkland 2020</a></footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  pressedKey: (keycode) => dispatch(pressedKey(keycode)),
  timedout: (time) => dispatch(timedout(time)),
  deleteLast: () => dispatch(deleteLast()),
  playOn: () => dispatch(playOn()),
  playStop: () => dispatch(playStop()),
  playPause: (i) => dispatch(playPause(i)),
  playbackCharacter: (c) => dispatch(playbackCharacter(c))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
