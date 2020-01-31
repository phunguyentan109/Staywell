import {ADD_MESSAGE} from "constants/ActionTypes";

export function addMessage(message="", negative=true) {
    return {type: ADD_MESSAGE, value: {message, negative}}
}
