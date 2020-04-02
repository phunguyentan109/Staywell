import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import RootRoutes from "./views/index";
import extractStorage from "constants/clientStorage";

import "assets/vendors/style";
import 'antd/dist/antd.css';
import "assets/wieldy.css";

import "assets/css/auth/index.css";
import "assets/css/app/index.css";

import configureStore from "appRedux";

const store = configureStore();
extractStorage(store); 

function App() {
    return (
        <Provider store={store}>
            <Router>
                <RootRoutes/>
            </Router>
        </Provider>
    );
}

export default App;
