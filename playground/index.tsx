import React from 'react';
import ReactDOM from 'react-dom';
import { ReactChannelIO } from 'react-channel-plugin';
import App from './App';

const autoBoot =
  new URLSearchParams(window.location.search).get('autoboot') === 'true';

ReactDOM.render(
  <React.StrictMode>
    <ReactChannelIO
      pluginKey="4e42e9d8-bfcd-4bb0-9cba-200f3807cc14"
      autoBoot={autoBoot}
    >
      <App />
    </ReactChannelIO>
  </React.StrictMode>,
  document.getElementById('root')
);
