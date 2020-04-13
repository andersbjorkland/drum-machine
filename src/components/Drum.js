import React from 'react';
import { connect } from 'react-redux';

import { pressedKey, drumClicked, timedout } from '../redux/actions';

class Drum extends React.Component {
    constructor(props) {
        super(props);
        this.play = this.play.bind(this);
    }

    play(e) {
        let element = e.currentTarget;
        let audioElementId = element.id.substring(15, 16);
        let audioElement = document.getElementById(audioElementId);
        this.props.timedout(300);
        if (audioElementId !== "s") {
            audioElement.currentTime = 0;
            audioElement.play();;
        }
        
        return this.props.drumClicked(audioElementId);
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
    timedout: (time) => dispatch(timedout(time))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Drum);