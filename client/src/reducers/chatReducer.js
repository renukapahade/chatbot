//Import types
import {
    INPUT_SUCCESS,
    INPUT_FAILURE,
    SESSION_SUCCESS,
    SESSION_END,
    SESSION_FAILURE,
    MESSAGE_SUCCESS,
    MESSAGE_FAILURE
} from "../actions/types";

//Import axios
import axios from "axios";

//Initial state
const initialState = {
    messages: []
}

//switch statement to update states
export default (state = initialState, action) => {
    const { type, payload } = action;
    let { messages } = state;
    switch (type) {
        case INPUT_SUCCESS:
            messages = [...messages, { message: payload, type: "user" }];
            return {
                ...state,
                messages
            };
        case INPUT_FAILURE:
            return {
                ...state,
            };
        case SESSION_SUCCESS:
            localStorage.setItem('session', payload["session_id"]);
            axios.defaults.headers.common["session_id"] = localStorage.session;
            return {
                ...state,
            };
        case SESSION_END:
            localStorage.removeItem('session');
            delete axios.defaults.headers.common["session_id"];
            messages = [...messages, { message: payload, type: "bot" }];
            return {
                ...state,
                messages
            };
        case SESSION_FAILURE:
            return {
                ...state,
            };
        case MESSAGE_SUCCESS:
            messages = [...messages, { message: payload, type: "bot" }];
            return {
                ...state,
                messages
            };
        case MESSAGE_FAILURE:
            return {
                ...state,
            };
        default:
            return {
                ...state,
            };
    }
}