export const PRESSED_KEY = "PRESSED_KEY";
export const DRUM_CLICKED = "DRUM_CLICKED";
export const RESET = "RESET";
export const RESET_ALL = "RESET_ALL";
export const REQUEST_DRUMS = "REQUEST_DRUMS";
export const RESOLVED_GET_DRUMS = "RESOLVED_GET_DRUMS";
export const DELETE_LAST = "DELETE_LAST";
export const PLAY_ON = "PLAY_ON";
export const PLAY_STOP = "PLAY_STOP";
export const PLAY_PAUSE = "PLAY_PAUSE";
export const PLAY_CHARACTER = "PLAY_CHARACTER";

export const pressedKey = (keycode) => ({
    type: PRESSED_KEY,
    payload: {
        keycode: keycode
    }
});

export const drumClicked = (elementId) => ({
    type: DRUM_CLICKED,
    payload: {
        id: elementId
    }
});

export const finishedTimer = () => {
    return {
        type: RESET
    }
}

export const resetAll = () => {
    return {
        type: RESET_ALL
    }
}

export function timedout(time) {
    return function(dispatch) {
        setTimeout(function(){dispatch(finishedTimer())}, time) ;
    }
}

export const deleteLast = (text) => {
    return {
        type: DELETE_LAST
    }
}

export const playOn = () => {
    return {
        type: PLAY_ON
    }
}


export const playStop = () => {
    return {
        type: PLAY_STOP
    }
}

export const playPause = (index) => {
    return {
        type: PLAY_PAUSE,
        payload: {
            index: index
        }
    }
}

export const playbackCharacter = (character) => {
    return {
        type: PLAY_CHARACTER,
        payload: {
            character: character
        }
    }
}