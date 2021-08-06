import React from 'react';
import { ReactChannelIO } from 'react-channel-plugin';
import ReactDOM from 'react-dom';

import App from './App';
import { CHANNEL_IO_PLUGIN_KEY } from './config';

const autoBoot =
  new URLSearchParams(window.location.search).get('autoboot') === 'true';

ReactDOM.render(
  <React.StrictMode>
    <ReactChannelIO
      pluginKey={CHANNEL_IO_PLUGIN_KEY}
      autoBoot={autoBoot}
      customLauncherSelector=".playground-launcher"
      language="en"
      verbose
    >
      <App />
    </ReactChannelIO>
  </React.StrictMode>,
  document.getElementById('root')
);
