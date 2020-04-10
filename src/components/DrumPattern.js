import React from 'react';
import { connect } from 'react-redux';

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
            <textarea readOnly ref={this.textarea} value={this.props.appReducer.pattern}></textarea>
        </div>
        );
    }

}

const mapStateToProps = state => ({
    ...state
});
  
export default connect(mapStateToProps)(DrumPattern);