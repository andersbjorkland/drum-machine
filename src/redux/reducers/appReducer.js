import cy00 from '../../sounds/CYCdh_K2room_Kick-03.mp3';
import cy01 from '../../sounds/CYCdh_K2room_Kick-04.mp3';
import cy02 from '../../sounds/CYCdh_K2room_Kick-05.mp3';
import cy03 from '../../sounds/CYCdh_K2room_Kick-06.mp3';
import cy04 from '../../sounds/CYCdh_K2room_Kick-07.mp3';
import cy05 from '../../sounds/CYCdh_K2room_Kick-08.mp3';
import cy06 from '../../sounds/CYCdh_ElecK02-Snr01.wav';
import cy07 from '../../sounds/CYCdh_ElecK02-HfHat.wav';
import cy08 from '../../sounds/CYCdh_ElecK02-FX01.wav';

import Drum from '../../utilities/Drum';

import {PRESSED_KEY} from '../actions';
import {pressedKey} from '../actions';

const drumClips = [
    new Drum(0, cy00, 'Q', 81),
    new Drum(1, cy01, 'W', 87),
    new Drum(2, cy02, 'E', 69),
    new Drum(3, cy03, 'A', 65),
    new Drum(4, cy04, 'S', 83),
    new Drum(5, cy05, 'D', 68),
    new Drum(6, cy06, 'Z', 90),
    new Drum(7, cy07, 'X', 88),
    new Drum(8, cy08, 'C', 67)
]

const initialState = {
    status: "OK",
    drums: drumClips,
    activeDrum: ""
}

function appReducer(state = initialState, action) {
    console.log("Handeling an action.");
    switch(action.type) {
        case PRESSED_KEY:
            console.log("KEY WAS PRESSED: " + action.payload.keycode);
            let active = drumClips.filter(obj => {
                return obj.keycode == action.payload.keycode;
            })
            return Object.assign({}, state, {
                activeDrum: active[0].id
            });
        default:
            return state;
    }
}

export default appReducer;