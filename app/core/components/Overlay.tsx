import React, { useEffect, useState } from 'react';

import { OverlayContainerProps, OverlayProps } from './Overlay.types';

const Overlay: React.FC<OverlayProps> = props => {
  const [visible, setVisible] = useState(props.open);

  useEffect(() => {
    if (!props.open) {
      setTimeout(() => {
        setVisible(false);
      }, 200);

      return;
    }

    setVisible(true);
  }, [props.open]);

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-30 transition ${
        !props.open ? 'bg-opacity-0' : ''
      } ${!visible ? 'invisible' : ''}`}
    >
      {props.children}
    </div>
  );
};

export const OverlayContainer: React.FC<OverlayContainerProps> = props => (
  <div className='w-full h-full relative'>{props.children}</div>
);

export default Overlay;
