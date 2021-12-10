import React, { forwardRef, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

type PopupProps = {
  top?: number;
  left?: number;
  width?: number;
  setOverlay?: boolean;
};

const popupOverlayEl = document.createElement('div');
popupOverlayEl.id = 'popup-overlay';

export const Popup = forwardRef<HTMLDivElement, React.PropsWithChildren<PopupProps>>(
  ({ children, top, left, width, setOverlay }, ref) => {
    const elementRef = useRef<HTMLDivElement>();
    const rootRef = useRef<HTMLElement>();
    const overlayRef = useRef<HTMLElement>();

    if (!elementRef.current) {
      elementRef.current = document.createElement('div');
      elementRef.current.className = 'popup';
      elementRef.current.style.position = 'absolute';
      elementRef.current.style.left = left ? `${String(left)}px` : '';
      elementRef.current.style.top = top ? `${String(top)}px` : '';
      elementRef.current.style.width = width ? `${String(width)}px` : '';
    }

    if (!rootRef.current) {
      rootRef.current = document.getElementById('popup-root');
    }

    useEffect(() => {
      if (setOverlay) {
        const overlay = document.getElementById('popup-overlay') || rootRef.current.appendChild(popupOverlayEl);
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.bottom = '0';
        overlay.style.left = '0';
        overlay.style.right = '0';

        overlay.appendChild(elementRef.current);
        overlayRef.current = overlay;
      } else {
        rootRef.current.appendChild(elementRef.current);
      }
      return () => {
        if (setOverlay) {
          overlayRef.current.removeChild(elementRef.current);
        } else {
          rootRef.current.removeChild(elementRef.current);
        }
        if (overlayRef.current?.children.length === 0) {
          rootRef.current.removeChild(overlayRef.current);
        }
      };
    }, []);

    return ReactDOM.createPortal(<div ref={ref}>{children}</div>, elementRef.current);
  },
);
