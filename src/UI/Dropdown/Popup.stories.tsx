import React, { useState } from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { Button } from 'components/Button/Button';
import { Popup } from './Popup';
import { Card } from 'components/Card/Card';

export const PopupStory: Story = () => {
  const [showPopup, setShowPopup] = useState<boolean>();
  return (
    <>
      <Button onClick={() => setShowPopup((isShown) => !isShown)}>Show popup</Button>
      {showPopup && (
        <Popup width={500}>
          <Card>This card was rendered in Popup, then it appeared on the top</Card>
        </Popup>
      )}
    </>
  );
};

PopupStory.storyName = 'Basic popup';

export default {
  title: 'Layout/Popup',
  component: Popup,
} as ComponentMeta<typeof Popup>;
