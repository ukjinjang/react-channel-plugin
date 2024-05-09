import React from 'react';
import { ReactChannelIO } from 'react-channel-plugin';
import { createRoot } from 'react-dom/client';

import App from './App';

//
//
//

const CHANNEL_IO_PLUGIN_KEY = '4e42e9d8-bfcd-4bb0-9cba-200f3807cc14'; // for demo purpose

const AUTO_BOOT =
  new URLSearchParams(window.location.search).get('autoboot') === 'true';

//
//
//

const rootEl = document.getElementById('root') as HTMLElement;
const root = createRoot(rootEl);

root.render(
  <React.StrictMode>
    <ReactChannelIO
      pluginKey={CHANNEL_IO_PLUGIN_KEY}
      autoBoot={AUTO_BOOT}
      customLauncherSelector=".playground-launcher"
      language="en"
      verbose
    >
      <App />
    </ReactChannelIO>
  </React.StrictMode>
);
