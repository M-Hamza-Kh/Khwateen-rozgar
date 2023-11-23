import {logout} from "../../../../utils/base";

export const SET_USER_DATA = "[USER] SET DATA";
export const USER_LOG_OUT = "[USER] LOG OUT";
export function setUserData(user){
    return (dispatch)=>{
        dispatch({
            type: SET_USER_DATA,
            payload: user
        })
    }
}

export function logOutUser(){
    logout();
}