import React, { useEffect, useRef } from 'react';
import { ModalPortal } from 'UI/Modal/ModalPortal';

type ModalProps = {
  onClose?: VoidFunction;
};

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const modalRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (onClose) {
      const listener = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node) && onClose) {
          onClose();
        }
      };

      addEventListener('click', listener);
      return () => {
        removeEventListener('click', listener);
      };
    }
  }, []);

  return (
    <ModalPortal>
      <div ref={modalRef}>{children}</div>
    </ModalPortal>
  );
};
