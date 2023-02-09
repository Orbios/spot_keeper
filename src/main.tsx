import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import App from 'components/App';

import {routes} from './routes';
import {store} from 'store';

import 'bootstrap/dist/css/bootstrap.css';
import 'toastr/build/toastr.css';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <React.StrictMode>
        <App routes={routes} />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
