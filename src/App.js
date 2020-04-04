import React from 'react';
import logo from './logo.svg';
import './App.css';

import Drumkit from './components/Drumkit';

import { connect } from 'react-redux';
import { pressedKey } from './redux/actions';


class App extends React.Component {
  constructor (props) {
    super(props);
    this.keyPress = this.keyPress.bind(this);
    this.permittedKeys = [81, 87, 69, 65, 83, 68, 90, 88, 67];
  }

  keyPress(e) {

    if (this.permittedKeys.includes(e.charCode)){
        return this.props.pressedKey(e.keyCode);
    } else if (this.permittedKeys.includes(e.charCode-32)) {
        let number = (e.charCode-32);
        return this.props.pressedKey(number);
    }
}

  render (){
    return (
      <div className="App" onKeyPress={this.keyPress} tabIndex="0">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Drumkit />
        </header>
        <p>Active drum is: {this.props.appReducer.activeDrum}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  pressedKey: (keycode) => dispatch(pressedKey(keycode))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
