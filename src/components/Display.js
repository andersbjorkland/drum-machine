import React from 'react';
import { connect } from 'react-redux';


class Display extends React.Component {
    render() {
        if(this.props.character === "s" ) {
            return (
                <div className="display" id={"display-"+this.props.id}>
                    <p>SPACE</p>
                </div>
            );
        } else {
            return (
                <div className="display" id={"display-"+this.props.id}>
                    <p>{this.props.character}</p>
                </div>
            );
        }
        
        
    }
}

const mapStateToProps = state => ({
    ...state
});
  
export default connect(mapStateToProps)(Display);