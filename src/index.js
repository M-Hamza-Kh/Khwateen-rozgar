import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
// import {CHAT_PROXY, SOCKET_CONNECTION} from "./utils/services";
// import {STRINGS} from "./utils/base";
// import $ from "jquery"
import {Provider} from "react-redux"
import {Store} from "./redux/store";


ReactDOM.render(
    <Provider store={Store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);