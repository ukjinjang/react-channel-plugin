import React from 'react';
import { ReactChannelIO } from 'react-channel-plugin';
import { createRoot } from 'react-dom/client';

import App from './App';
import { CHANNEL_IO_PLUGIN_KEY } from './config';

const autoBoot =
  new URLSearchParams(window.location.search).get('autoboot') === 'true';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
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
  </React.StrictMode>
);
