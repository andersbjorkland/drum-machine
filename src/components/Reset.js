import React from 'react';
import { connect } from 'react-redux';

import { resetAll, timedout } from '../redux/actions';

class Reset extends React.Component {
    constructor(props) {
        super(props);
        this.reset = this.reset.bind(this);
    }

    reset() {
        this.props.reset();
    }

    render() {
        if ("reset" === this.props.appReducer.activeButton) {
            return (
                <div id="reset" className="btn danger active" onClick={this.reset}>
                    RESET
                </div>
            );
        } else {
            return (
                <div id="reset" className="btn danger" onClick={this.reset}>
                    RESET
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    reset: () => dispatch(resetAll()),
    timedout: (time) => dispatch(timedout(time))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Reset);