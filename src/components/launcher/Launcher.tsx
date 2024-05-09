import React from 'react';

import { useChannelIOApi, useChannelIOEvent } from '../../hooks';
import { _useContext } from '../../hooks/_useContext';

//
//
//

export interface ReactChannelIOLauncherChildrenProps {
  /** Is Channel messenger booted? */
  isBooted: boolean;
  /** Is Channel messenger open? */
  isOpen: boolean;
  /** Show Channel messenger. */
  show: () => void;
  /** Hide Channel messenger. */
  hide: () => void;
  /** Toggle Channel messenger. */
  toggle: () => void;
}

export interface ReactChannelIOLauncherProps {
  children?:
    | React.ReactNode
    | ((props: ReactChannelIOLauncherChildrenProps) => React.ReactNode);
  /** Mount launcher on Channel messenger boot. */
  mountOnBoot?: boolean;
}

//
//
//

/**
 * React component for custom Channel messenger launcher.
 */
const ReactChannelIOLauncher: React.FC<ReactChannelIOLauncherProps> = ({
  children,
  mountOnBoot = false,
}) => {
  const context = _useContext();

  const [isOpen, setOpen] = React.useState(false);

  const { showMessenger, hideMessenger } = useChannelIOApi();

  useChannelIOEvent('onShowMessenger', () => setOpen(true));
  useChannelIOEvent('onHideMessenger', () => setOpen(false));

  const toggle = () => {
    if (isOpen) {
      hideMessenger();
    } else {
      showMessenger();
    }
  };

  //
  //
  //

  if (mountOnBoot && !context.isBooted) {
    return null;
  }

  return typeof children === 'function'
    ? children({
        isBooted: context.isBooted,
        isOpen,
        show: showMessenger,
        hide: hideMessenger,
        toggle,
      })
    : children;
};

export default ReactChannelIOLauncher;
