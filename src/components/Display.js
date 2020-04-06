import React from 'react';
import { connect } from 'react-redux';


class Display extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="display">
                <p>{this.props.appReducer.activeDrum}</p>
            </div>
        );
        
    }
}

const mapStateToProps = state => ({
    ...state
});
  
export default connect(mapStateToProps)(Display);