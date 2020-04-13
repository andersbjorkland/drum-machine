import React from 'react';
import { connect } from 'react-redux';

import stopImg from '../stop.svg';

class PlaybackPlay extends React.Component {
    render() {
        return (
        <div className="btn">
            <img src={stopImg} alt="play-control" className="control" onClick={this.props.clickFunction}/>
        </div>
        );
    }

}

const mapStateToProps = state => ({
    ...state
});
  
export default connect(mapStateToProps)(PlaybackPlay);