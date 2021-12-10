import React from 'react';
import { Story, ComponentMeta } from '@storybook/react';
import { Grid } from './Grid';
import { Card } from '../Card/Card';
import { Title } from 'UI/Typography/Title';

const Template: Story = (args) => (
  <Grid {...args} colGap={{ sm: 3, md: 5 }} rowGap={{ sm: 3, md: 5 }}>
    <Card variant="lighten" colSpan={{ md: 6, lg: 6 }} rowSpan={{ md: 2, lg: 3 }}>
      <Card.Content>
        <Title level={1}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quia neque ex doloribus iste aperiam natus
          quam, consequuntur voluptatum delectus repellendus deleniti rerum, ad ut nam earum veritatis architecto.
          Numquam!
        </Title>
      </Card.Content>
    </Card>
    <Card colSpan={{ sm: 6, md: 3, lg: 3 }}>
      <Card.Content>
        <Title level={1}>2</Title>
      </Card.Content>
    </Card>
    <Card colSpan={{ sm: 6, md: 3, lg: 3 }}>
      <Card.Content>
        <Title level={1}>3</Title>
      </Card.Content>
    </Card>
    <Card colSpan={{ md: 6, lg: 6 }}>
      <Card.Content>
        <Title level={1}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta maiores fugit blanditiis pariatur dicta
          aliquam distinctio natus vero quos, ducimus, facere enim deleniti aspernatur beatae provident quam magni sed
          ullam
        </Title>
      </Card.Content>
    </Card>
    <Card colSpan={{ md: 4, lg: 2 }}>
      <Card.Content>
        <Title level={1}>5</Title>
      </Card.Content>
    </Card>
    <Card colSpan={{ md: 4, lg: 2 }}>
      <Card.Content>
        <Title level={1}>6</Title>
      </Card.Content>
    </Card>
    <Card colSpan={{ md: 4, lg: 2 }}>
      <Card.Content>
        <Title level={1}>7</Title>
      </Card.Content>
    </Card>
  </Grid>
);

export const Basic = Template.bind({});
Basic.storyName = 'Basic grid';

export default {
  title: 'Layout/Grid',
  component: Grid,
  args: {},
} as ComponentMeta<typeof Grid>;
