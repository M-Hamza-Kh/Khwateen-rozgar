import * as Action from "../actions";

let initialState = {
    success: false,
    error: {
        email: null,
        password: null
    }
}

const login = function (state = initialState, action) {
    switch (action.type) {
        case Action.LOGIN_SUCCESS : {
            return {
                ...initialState,
                success: false
            }
        }
        case Action.LOGIN_ERROR : {
            return {
                success: false,
                error: action.payload
            }
        }
        case Action.LOGIN_PENDING : {
            return {
                success: true,
            }
        }
        default: {
            return state
        }
    }
}

export default login