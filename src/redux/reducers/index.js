import {combineReducers} from "redux";
import authReducers from "../../components/auth/store/reducers";
import ReviewReducer from "../reviews/reducer";

const createReducer = (asyncReducers) =>
    combineReducers({
        ReviewReducer:ReviewReducer,
        authReducers,
        ...asyncReducers
    })


export default createReducer;
