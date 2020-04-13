import React from 'react';
import { connect } from 'react-redux';

import playImg from '../play.svg';

class PlaybackPlay extends React.Component {
    render() {
        return (
        <div className="btn" onClick={this.props.clickFunction}>
            <img src={playImg} alt="play-control" className="control" />
        </div>
        );
    }

}

const mapStateToProps = state => ({
    ...state
});
  
export default connect(mapStateToProps)(PlaybackPlay);