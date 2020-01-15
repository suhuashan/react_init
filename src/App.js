import React from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from "react-router-config";
import { BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from "./style.js";

import store from './store/index.js';
import routes from "./routes/index.js";
import './assets/iconfont/iconfont.css';



function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle/>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>
  );
}

export default App;
