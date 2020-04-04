import React from 'react';
import { connect } from 'react-redux';
import Drum from './Drum';


class Drumkit extends React.Component {
    constructor(props) {
        super(props);
        this.drums = this.props.appReducer.drums;
    }

    render () {
        const drumComponents = [];
        this.drums.forEach(drum => {
            drumComponents.push(<Drum key={drum.id} id={drum.id} src={drum.src} char={drum.char}/>)
        });
        return (
            <div id="drum-machine">
                {drumComponents}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});
  
export default connect(mapStateToProps)(Drumkit);