//Import types
import {
    INPUT_SUCCESS,
    INPUT_FAILURE,
    SESSION_SUCCESS,
    SESSION_END,
    SESSION_FAILURE,
    MESSAGE_SUCCESS,
    MESSAGE_FAILURE
} from "./types";


//Import axios
import axios from "axios";

//Function that handles user inputs
export const userMessage = (message) => async (dispatch) => {
    try {
        dispatch({ type: INPUT_SUCCESS, payload: message })
    } catch (err) {
        dispatch({ type: INPUT_FAILURE })
    }
};

//Create a session - API CALL
export const createSession = message => async (dispatch) => {
    try {
        const res = await axios.get('api/users/session')
        dispatch({ type: SESSION_SUCCESS, payload: res.data })
        if (message) {
            const body = { message: message, type: 'user' };
            const res = await axios.post('api/users/account', body)
            if (res.data.session_end) {
                dispatch({ type: SESSION_END, payload: res.data.message })
            } else {
                dispatch({ type: MESSAGE_SUCCESS, payload: res.data.message })
            }
        }
    } catch (err) {
        dispatch({ type: SESSION_FAILURE })
    }
}

//Send message to the bot - API CALL
export const sendMessage = message => async (dispatch) => {
    try {
        const body = { message: message, type: 'user' };
        const res = await axios.post('api/users/account', body)
        if (res.data.session_end) {
            dispatch({ type: SESSION_END, payload: res.data.message })
        } else {
            dispatch({ type: MESSAGE_SUCCESS, payload: res.data.message })
        }
    } catch (err) {
        dispatch({ type: MESSAGE_FAILURE })
    }
}