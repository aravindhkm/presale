import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const createOverlay = () => {
  const el = document.createElement('div');
  el.id = 'modal-overlay';
  return el;
};

const createContainer = () => {
  const el = document.createElement('div');
  el.className = 'modal';
  el.style.position = 'absolute';
  el.style.display = 'flex';
  el.style.justifyContent = 'center';
  el.style.alignItems = 'center';
  el.style.left = '0px';
  el.style.right = '0px';
  el.style.top = '0px';
  el.style.bottom = '0px';
  return el;
};

export const ModalPortal: React.FC = ({ children }) => {
  const rootRef = useRef<HTMLElement>();
  const containerRef = useRef<HTMLDivElement>();
  const modalRef = useRef<HTMLElement>();

  if (!containerRef.current) {
    containerRef.current = createContainer();
  }

  if (!rootRef.current) {
    rootRef.current = document.getElementById('modal-root');
  }

  useEffect(() => {
    const overlay = document.getElementById('modal-overlay') || rootRef.current.appendChild(createOverlay());
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.bottom = '0';
    overlay.style.left = '0';
    overlay.style.right = '0';
    setInterval(() => {
      overlay.className = 'shown';
    });

    overlay.appendChild(containerRef.current);
    modalRef.current = overlay;
    return () => {
      modalRef.current.removeChild(containerRef.current);
      if (modalRef.current?.children.length === 0) {
        rootRef.current.removeChild(modalRef.current);
      }
    };
  }, []);

  return ReactDOM.createPortal(children, containerRef.current);
};
