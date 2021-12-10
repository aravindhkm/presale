import React from 'react';
import { useSelector } from 'react-redux';
import { selectDialogs } from 'store/ui/dialogs';
import { Modal } from './Modal';

export const DialogRoot: React.FC = () => {
  const dialogs = useSelector(selectDialogs);

  return (
    <>
      {dialogs.map(({ id, Component, props }) => (
        <Modal key={id} onClose={props.onClose}>
          <Component {...props} />
        </Modal>
      ))}
    </>
  );
};
