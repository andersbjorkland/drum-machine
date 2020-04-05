import React from 'react';
import logo from './logo.svg';
import './App.css';

import Drumkit from './components/Drumkit';

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
        audioElement.play();
        return this.props.pressedKey(e.charCode);
    } else if (this.permittedKeys.includes(e.charCode-32)) {
        let number = (e.charCode-32);
        audioElement = document.getElementById(String.fromCharCode(number));
        audioElement.play();
        return this.props.pressedKey(number);
    }
  }

  render (){
    return (
      <div className="App" onKeyPress={this.keyPress} tabIndex="0">
        <header className="App-header">
          <h1>The Drum Machine</h1>
        </header>
        <div id="content-container">
          <Drumkit />
        </div>
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
