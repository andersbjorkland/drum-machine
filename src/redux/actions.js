export const PRESSED_KEY = "PRESSED_KEY";
export const DRUM_CLICKED = "DRUM_CLICKED";
export const RESET = "RESET";
export const REQUEST_DRUMS = "REQUEST_DRUMS";
export const RESOLVED_GET_DRUMS = "RESOLVED_GET_DRUMS";
export const DELETE_LAST = "DELETE_LAST";

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

export function timedout() {
    return function(dispatch) {
        setTimeout(function(){dispatch(finishedTimer())}, 300) ;
    }
}

export const getDrums = () => {
    console.log('getDrums is fired');

    return function (dispatch) {
    // Make the app aware of fired async action
    dispatch(requestDrums());

    return fetch('https://localhost:8443/drums.json')
        .then(response => response.json(), error => console.log('An error occured.', error))
        .then(json => dispatch(resolvedGetDrums(json)));
    }
}

export const resolvedGetDrums = (json) =>  {
    return {
        type: RESOLVED_GET_DRUMS,
        payload: json
    }
}

export const requestDrums = () => {
    return {
        type: REQUEST_DRUMS
    }
}

export const deleteLast = (text) => {
    return {
        type: DELETE_LAST
    }
}