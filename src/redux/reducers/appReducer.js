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

import {PRESSED_KEY, DRUM_CLICKED, RESET, REQUEST_DRUMS, RESOLVED_GET_DRUMS, DELETE_LAST, PLAY_ON} from '../actions';

const drumClips = [
    new Drum(0, "", 'Q', 81),
    new Drum(1, "", 'W', 87),
    new Drum(2, "", 'E', 69),
    new Drum(3, "", 'A', 65),
    new Drum(4, "", 'S', 83),
    new Drum(5, "", 'D', 68),
    new Drum(6, "", 'Z', 90),
    new Drum(7, "", 'X', 88),
    new Drum(8, "", 'C', 67)
]

const initialState = {
    status: "OK",
    drums: [],
    activeDrum: "",
    activeButton: "",
    pattern: "",
    permittedKeys: [65, 67, 68, 69, 81, 83, 87, 88, 90],
    spaceKey: 32,
    isFetching: true,
    timer: null,
    playbackSpeed: 300
}

function appReducer(state = initialState, action) {
    let active = "";
    let char = "";
    let charId = "";
    switch(action.type) {
        case PRESSED_KEY:
            active = state.drums.filter(obj => {
                return obj.keycode == action.payload.keycode;
            });
            char = getActiveChar(active);
            charId = active[0].char;
            return Object.assign({}, state, {
                activeDrum: charId,
                pattern: state.pattern + char
            });
        case DRUM_CLICKED:
            let id = action.payload.id;
            active = state.drums.filter(obj => {
                return obj.char === id;
            })
            char = getActiveChar(active);
            charId = active[0].char;
            return Object.assign({}, state, {
                activeDrum: charId,
                pattern: state.pattern + char
            });
        case RESET:
            return Object.assign({}, state, {
                activeDrum: "",
                activeButton: ""
            });
        case REQUEST_DRUMS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RESOLVED_GET_DRUMS:
            let jsonDrums = action.payload;
            let drums = [];
            let drumId = 0;
            jsonDrums.forEach(element => {
                drums.push(new Drum(drumId, "https://localhost:8443" + element.clip, element.char, element.keycode));
                drumId++;
            });
            drums.push(new Drum(9, "", "s", "32"));
            return Object.assign({}, state, {
                isFetching: false,
                drums: drums
            });
        case DELETE_LAST:
            let pattern = "";
            if (state.pattern.length > 1) {
                pattern = state.pattern.substr(0, state.pattern.length - 1);
            }
            return Object.assign({}, state, {
                pattern: pattern,
                activeButton: "delete"
            });
        default:
            return state;
    }
}

function getActiveChar(active) {
    return active[0].char === "s" ? " " : active[0].char;
}

export default appReducer;