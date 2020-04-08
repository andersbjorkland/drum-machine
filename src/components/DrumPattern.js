import React from 'react';
import { connect } from 'react-redux';

import { pressedKey, drumClicked, timedout } from '../redux/actions';

class DrumPattern extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        <div>
            <textarea>{this.props.appReducer.pattern}</textarea>
        </div>
    }

}

const mapStateToProps = state => ({
    ...state
});

// const mapDispatchToProps = dispatch => ({
//     timedout: () => dispatch(timedout())
// });
  
export default connect(mapStateToProps)(DrumPattern);