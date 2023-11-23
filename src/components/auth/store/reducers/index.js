import {combineReducers} from "redux";
import user from "./user_reducers";
import login from "./login_reducers"

const authReducers = combineReducers({
    login,
    user,
})

export default authReducers