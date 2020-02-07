import {ADD_MESSAGE, CLEAR_MESSAGE} from "constants/ActionTypes";

export function addMessage(message="", negative=true) {
    return {type: ADD_MESSAGE, value: {message, negative}}
}

export function clearMessage(message="", negative=false) {
    return {type: CLEAR_MESSAGE, value: {message, negative}}
}
