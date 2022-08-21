import React, { useEffect, useState } from 'react';

import { ModalActionsProps, ModalProps, ModalTileProps } from './Modal.types';

export const MODAL_TRANSITION_DURATION = 200;

const Modal: React.FC<ModalProps> = props => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!props.open) {
      setTimeout(() => {
        setVisible(false);
      }, MODAL_TRANSITION_DURATION);

      return;
    }

    setVisible(true);
  }, [props.open]);

  return (
    <div
      className={`modal modal-bottom sm:modal-middle ${
        props.open ? 'modal-open' : ''
      } ${visible ? 'visible' : ''}`}
    >
      <div className='modal-box'>{props.children}</div>
    </div>
  );
};

export const ModalTitle: React.FC<ModalTileProps> = props => (
  <h3 className='font-bold text-lg pb-4'>{props.children}</h3>
);

export const ModalActions: React.FC<ModalActionsProps> = props => (
  <div className='modal-action'>{props.children}</div>
);

export default Modal;
