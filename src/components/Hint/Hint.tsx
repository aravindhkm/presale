import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { Card } from 'components/Card/Card';
import { Popup } from 'UI/Dropdown/Popup';
import { Paragraph } from 'UI/Typography/Paragraph';

type HintProps = {
  text: string;
};

const styles = {
  initiator: css`
    display: inline-block;
    cursor: pointer;
  `,
};

export const Hint: React.FC<HintProps> = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState<boolean>();

  const initiatorRef = useRef<HTMLDivElement>();
  const popupRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };
    if (isVisible) {
      addEventListener('click', listener);
      return () => {
        removeEventListener('click', listener);
      };
    }
  }, [isVisible]);

  const handleClick = () => setIsVisible(true);

  return (
    <>
      <div ref={initiatorRef} css={styles.initiator} onClick={handleClick}>
        {children}
      </div>
      {isVisible && (
        <Popup
          left={initiatorRef.current.offsetLeft + initiatorRef.current.clientWidth}
          top={initiatorRef.current.offsetTop}
          width={400}
          ref={popupRef}
        >
          <Card>
            <Card.Content>
              <Paragraph>{text}</Paragraph>
            </Card.Content>
          </Card>
        </Popup>
      )}
    </>
  );
};
