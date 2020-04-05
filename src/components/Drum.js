import React from 'react';
import { connect } from 'react-redux';

import { pressedKey, drumClicked, timedout } from '../redux/actions';

class Drum extends React.Component {
    constructor(props) {
        super(props);
        this.play = this.play.bind(this);
        this.permittedKeys = [65, 67, 68, 69, 81, 83, 87, 88, 90];
    }

    play(e) {
        let element = e.currentTarget;
        this.props.timedout();
        return this.props.drumClicked(element.id);
        // let elementId = e.currentTarget.id;
            // const drumElement = document.getElementById(this.props.keyTrigger);
            // drumElement.classList('active');
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
    pressedKey: (keycode) => dispatch(pressedKey(keycode)),
    drumClicked: (id) => dispatch(drumClicked(id)),
    timedout: () => dispatch(timedout())
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Drum);