import React from 'react';
import { connect } from 'react-redux';

import { deleteLast, timedout } from '../redux/actions';

class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.deleteLast = this.deleteLast.bind(this);
    }

    deleteLast() {
        this.props.timedout(300);
        return this.props.deleteLast();
    }

    render() {
        if ("delete" === this.props.appReducer.activeButton) {
            return (
                <div id="delete" className="btn active" onClick={this.deleteLast}>
                    DELETE
                </div>
            );
        } else {
            return (
                <div id="delete" className="btn" onClick={this.deleteLast}>
                    DELETE
                </div>
            );
        }
    }

}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    deleteLast: () => dispatch(deleteLast()),
    timedout: (time) => dispatch(timedout(time))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Delete);