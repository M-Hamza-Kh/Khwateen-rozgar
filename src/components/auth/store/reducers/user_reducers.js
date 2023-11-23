import * as Action from "../actions";
const initialState = {
    data: null
}

const user = function (state = initialState, action) {
    switch (action.type){
        case Action.SET_USER_DATA:
        {
            return {
                ...initialState,
                ...action.payload
            }
        }
        case Action.USER_LOG_OUT:
        {
            return {
                ...initialState,
                ...action.payload
            }
        }
        default :
        {
            return state
        }
    }
}

export default user;