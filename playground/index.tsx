import React from 'react';
import ReactDOM from 'react-dom';
import { ReactChannelIO } from '../src';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ReactChannelIO pluginKey="4e42e9d8-bfcd-4bb0-9cba-200f3807cc14">
      <App />
    </ReactChannelIO>
  </React.StrictMode>,
  document.getElementById('root')
);
