export const PRESSED_KEY = "PRESSED_KEY";

export const pressedKey = (keycode) => ({
    type: PRESSED_KEY,
    payload: {
        keycode: keycode
    }
});