import React from 'react';
import ReactDOM from 'react-dom';
import { ReactChannelIO } from 'react-channel-plugin';

import App from './App';
import { CHANNEL_IO_PLUGIN_KEY } from './config';

const autoBoot =
  new URLSearchParams(window.location.search).get('autoboot') === 'true';

ReactDOM.render(
  <React.StrictMode>
    <ReactChannelIO pluginKey={CHANNEL_IO_PLUGIN_KEY} autoBoot={autoBoot}>
      <App />
    </ReactChannelIO>
  </React.StrictMode>,
  document.getElementById('root')
);
