import React from 'react';
import { connect } from 'react-redux';

import { pressedKey } from '../redux/actions';

class Drum extends React.Component {
    constructor(props) {
        super(props);
        this.play = this.play.bind(this);
        this.permittedKeys = [65, 67, 68, 69, 81, 83, 87, 88, 90];
    }

    play(e) {
        // let elementId = e.currentTarget.id;
        if (this.permittedKeys.includes(e.keycode)){
            // const drumElement = document.getElementById(this.props.keyTrigger);
            // drumElement.classList('active');
            return this.props.pressedKey(e.keycode);

        } else {
            console.log("not permitted key: " + e.keycode);
        }
        // this.props.updateActiveDrum(elementId);
        // 
        // const drumId = e.currentTarget;
        // sound.currentTime = 0;
        // sound.play();
    }

    render() {
        if (this.props.id === this.props.appReducer.activeDrum) {
            return (
                <div id={"drum-container-" + this.props.id}
                    onClick={this.play} 
                    className="drum-pad active"
                >{this.props.char}
                    <audio className="clip" id={this.props.char} src={this.props.src}></audio>
                </div>
            );
        } else {
            console.log("nomatch");
            return (
                <div id={"drum-container-" + this.props.id} 
                    onClick={this.play} 
                    className="drum-pad"
                >{this.props.char}
                    <audio className="clip" id={this.props.char} src={this.props.src}></audio>
                </div>
            );
        }
        
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    pressedKey: (keycode) => dispatch(pressedKey(keycode))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Drum);