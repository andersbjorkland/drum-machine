import React from 'react';
import { connect } from 'react-redux';
import Drum from './Drum';
import { getDrums } from '../redux/actions';


class Drumkit extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getDrums();
    }

    render () {
        if (this.props.appReducer.isFetching) {
            return (
                <div id="drum-kit">
                    <div><p>LOADING</p></div>
                </div>
            );
        } else {
            const drumComponents = [];
            this.props.appReducer.drums.forEach(drum => {
                drumComponents.push(<Drum key={drum.id} id={drum.char} src={drum.src} char={drum.char}/>)
            });
            return (
                <div id="drum-kit">
                    {drumComponents}
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    getDrums: () => dispatch(getDrums()),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Drumkit);