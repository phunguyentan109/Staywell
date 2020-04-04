import { ADD_MESSAGE } from "constants/ActionTypes";

export function addMessage(text="", isNegative=true) {
    return { type: ADD_MESSAGE, value: { text, isNegative } }
}
