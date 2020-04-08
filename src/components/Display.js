import React from 'react';
import { connect } from 'react-redux';


class Display extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.appReducer.activeDrum === "s" ) {
            return (
                <div id="display">
                    <p>SPACE</p>
                </div>
            );
        } else {
            return (
                <div id="display">
                    <p>{this.props.appReducer.activeDrum}</p>
                </div>
            );
        }
        
        
    }
}

const mapStateToProps = state => ({
    ...state
});
  
export default connect(mapStateToProps)(Display);