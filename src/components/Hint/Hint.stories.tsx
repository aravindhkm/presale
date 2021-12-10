import React from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { Hint } from './Hint';

export const HintStory: Story = () => {
  return (
    <Hint text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel cum ea deserunt harum, sequi vitae expedita libero impedit accusantium esse dolores quae sapiente quaerat ipsam numquam, doloremque enim aliquid corrupti.">
      Click me!
    </Hint>
  );
};

HintStory.storyName = 'Basic hint';

export default {
  title: 'Components',
  component: Hint,
} as ComponentMeta<typeof Hint>;
