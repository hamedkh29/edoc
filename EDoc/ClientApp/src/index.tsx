import 'bootstrap/dist/css/bootstrap.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import React from "react";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import reducers from "./redux/reducers";
import {CssBaseline} from "@mui/material";

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
declare global {
    interface Window {
        History: any;
        ApiUrl: string;
        BaseUrl: string;
    }
}
window.BaseUrl = process.env.REACT_APP_BASE_API
window.ApiUrl = window.BaseUrl + "api/v1/";
const store = createStore(reducers, applyMiddleware(thunk));
root.render(
  <BrowserRouter basename={baseUrl}>
      <Provider store={store}>
          <>
              <CssBaseline />
              <App />
          </>
        
      </Provider>
  </BrowserRouter>);
