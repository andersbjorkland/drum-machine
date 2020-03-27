import cy01 from '../sounds/CYCdh_K2room_Kick-03.mp3';
import cy02 from '../sounds/CYCdh_K2room_Kick-04.mp3';
import cy03 from '../sounds/CYCdh_K2room_Kick-05.mp3';
import cy04 from '../sounds/CYCdh_K2room_Kick-06.mp3';
import cy05 from '../sounds/CYCdh_K2room_Kick-07.mp3';
import cy06 from '../sounds/CYCdh_K2room_Kick-08.mp3';
import React from 'react';



class Drumkit extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        const drumArr = [
            cy01,
            cy02,
            cy03,
            cy04,
            cy05,
            cy06
        ];
        const drumkit = drumArr.map(i => 
            <audio controls src={i}> Your browser does not support the <code>audio</code> element.</audio>
        );

        return (
            <div>
                {drumkit}
            </div>
        );
    }
}





export default Drumkit;