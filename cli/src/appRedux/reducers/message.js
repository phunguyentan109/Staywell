import {ADD_MESSAGE, CLEAR_MESSAGE} from "constants/ActionTypes";

const DEFAULT_STATE = {
    message: "",
    negative: false
}

export default (state = DEFAULT_STATE, action) => {
    const {type, value} = action;
    switch(type){
        case ADD_MESSAGE:
            return { ...state, ...value};
        case CLEAR_MESSAGE:
            return {...state};
        default:
            return state;
    }
}
