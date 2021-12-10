import React, { useState } from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { Button } from 'components/Button/Button';
import { Card } from 'components/Card/Card';
import { Title } from 'UI/Typography/Title';
import { Modal } from './Modal';

export const ModalStory: Story = () => {
  const [isShown, setIsShown] = useState<boolean>();

  return (
    <>
      <Button onClick={() => setIsShown(true)}>Show modal</Button>
      {isShown && (
        <Modal onClose={() => setIsShown(false)}>
          <Card>
            <Card.Content>
              <Title level={2}>This is modal</Title>
              <Button variant="secondary" onClick={() => setIsShown(false)}>
                Close X
              </Button>
            </Card.Content>
          </Card>
        </Modal>
      )}
    </>
  );
};

ModalStory.storyName = 'Modal';

export default {
  title: 'UI',
  component: Modal,
} as ComponentMeta<typeof Modal>;
