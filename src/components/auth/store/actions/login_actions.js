import {API} from "../../../../utils/services";
import {setUserData} from "./user_actions";


export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_PENDING = "LOGIN_PENDING";


export function submitLogin({email, password},isRemember) {
    return (dispatch) => {
        dispatch({
            type: LOGIN_PENDING
        })
        API.AUTH.SignIn({email, password}, isRemember).then((user) => {
            dispatch(setUserData(user))
            return dispatch({
                type: LOGIN_SUCCESS
            })
        }).catch((error) => {
            return dispatch({
                type: LOGIN_ERROR,
                payload: error
            })
        })
    }
}

export function submitRegister(obj) {
    return (dispatch) => {
        API.AUTH.SignUp(obj).then((user) => {
            dispatch(setUserData(user))
            return dispatch({
                type: LOGIN_SUCCESS
            })
        }).catch((error) => {
            return dispatch({
                type: LOGIN_ERROR,
                payload: error
            })
        })
    }
}


