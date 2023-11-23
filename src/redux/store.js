import {applyMiddleware,compose,createStore} from "redux";
import createReducer from "./reducers";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";

const Middleware = compose(
    applyMiddleware(thunk,createLogger())
)


export const Store = createStore(createReducer(),Middleware)