import cy00 from '../../sounds/CYCdh_ElecK04-Kick01.wav';
import cy01 from '../../sounds/CYCdh_ElecK04-Kick02.wav';
import cy02 from '../../sounds/CYCdh_ElecK06-Clap02.wav';
import cy03 from '../../sounds/CYCdh_K4-ClHat02.wav';
import cy04 from '../../sounds/CYCdh_K4-Kick01.wav';
import cy05 from '../../sounds/CYCdh_K4-OpHat02.wav';
import cy06 from '../../sounds/CYCdh_K4-Snr02.wav';
import cy07 from '../../sounds/CYCdh_K4-Snr07.wav';
import cy08 from '../../sounds/CYCdh_K5-Snr04.wav';

import Drum from '../../utilities/Drum';

import {PRESSED_KEY, DRUM_CLICKED, RESET, RESET_ALL, DELETE_LAST, PLAY_ON, PLAY_STOP, PLAY_PAUSE, PLAY_CHARACTER} from '../actions';

const drumClips = [
    new Drum(0, cy00, 'Q', 81),
    new Drum(1, cy01, 'W', 87),
    new Drum(2, cy02, 'E', 69),
    new Drum(3, cy03, 'A', 65),
    new Drum(4, cy04, 'S', 83),
    new Drum(5, cy05, 'D', 68),
    new Drum(6, cy06, 'Z', 90),
    new Drum(7, cy07, 'X', 88),
    new Drum(8, cy08, 'C', 67),
    new Drum(9, "", "s", "32")
]

const initialState = {
    status: "OK",
    drums: drumClips,
    activeDrum: "",
    activeButton: "",
    pattern: "",
    permittedKeys: [65, 67, 68, 69, 81, 83, 87, 88, 90],
    spaceKey: 32,
    isFetching: false,
    timer: null,
    playbackSpeed: 350,
    playback: false,
    playbackIndex: 0,
    playbackCharacter: ""
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
        case DELETE_LAST:
            let pattern = "";
            if (state.pattern.length > 1) {
                pattern = state.pattern.substr(0, state.pattern.length - 1);
            }
            return Object.assign({}, state, {
                pattern: pattern,
                activeButton: "delete"
            });
        case PLAY_STOP:
            return Object.assign({}, state, {
                playback: false,
                playbackIndex: 0
            });
        case PLAY_ON:
            return Object.assign({}, state, {
                playback: true
            });
        case PLAY_PAUSE:
            return Object.assign({}, state, {
                playback: false,
                playbackIndex: action.payload.index
            });
        case RESET_ALL:
            return Object.assign({}, state, {
                ...initialState
            });
        case PLAY_CHARACTER:
            return Object.assign({}, state, {
                playbackCharacter: action.payload.character
            });
        default:
            return state;
    }
}

function getActiveChar(active) {
    return active[0].char === "s" ? " " : active[0].char;
}

export default appReducer;