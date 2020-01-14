import React from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from "react-router-config";
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from "./style";

import store from './store/index.js';
import routes from "./routes/index.js";

import Header from './layout/header/index.js';


function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle></GlobalStyle>
      <Header />
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>
  );
}

export default App;
