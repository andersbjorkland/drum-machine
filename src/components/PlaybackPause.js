import React from 'react';
import { connect } from 'react-redux';

import pauseImg from '../pause.svg';

class PlaybackPause extends React.Component {

    render() {
        return (
        <div className="btn">
            <img src={pauseImg} alt="play-control" className="control" onClick={this.props.clickFunction}/>
        </div>
        );
    }

}

const mapStateToProps = state => ({
    ...state
});
  
export default connect(mapStateToProps)(PlaybackPause);