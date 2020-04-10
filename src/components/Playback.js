import React from 'react';
import { connect } from 'react-redux';

import playImg from '../play.svg';

class Playback extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div id="playback-btn" className="btn">
            <img src={playImg} alt="play-control" className="control" onClick={this.props.clickFunction}/>
        </div>
        );
    }

}

const mapStateToProps = state => ({
    ...state
});
  
export default connect(mapStateToProps)(Playback);