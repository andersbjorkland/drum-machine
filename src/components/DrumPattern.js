import React from 'react';
import { connect } from 'react-redux';

import { pressedKey, drumClicked, timedout } from '../redux/actions';

class DrumPattern extends React.Component {
    constructor(props) {
        super(props);
        this.textarea = React.createRef();
    }

    componentDidUpdate() {
        this.textarea.current.scrollTop = this.textarea.current.scrollHeight;
    }

    render() {

        return (
        <div id="drum-pattern-container">
            <h2>Track</h2>
            <textarea ref={this.textarea} value={this.props.appReducer.pattern}></textarea>
        </div>
        );
    }

}

const mapStateToProps = state => ({
    ...state
});

// const mapDispatchToProps = dispatch => ({
//     timedout: () => dispatch(timedout())
// });
  
export default connect(mapStateToProps)(DrumPattern);