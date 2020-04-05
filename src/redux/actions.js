export const PRESSED_KEY = "PRESSED_KEY";
export const DRUM_CLICKED = "DRUM_CLICKED";
export const RESET = "RESET";

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
    console.log("finishedTimer is called");
    return {
        type: RESET
    }
}

// export const timedout = () => ({
//     type: RESET
// });

export function timedout() {
    console.log("Timeout called");
    return function(dispatch) {
        console.log("inside dispatch of timedout.");
        setTimeout(function(){dispatch(finishedTimer())}, 1000) ;
    }
}