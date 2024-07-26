import type { Meta, StoryObj } from '@storybook/react';
import { Day } from './Day';

const meta = {
  title: 'UI/Atoms/Day',
  component: Day,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['!autodocs'],
  argTypes: {},
} satisfies Meta<typeof Day>;

export default meta;

type Story = StoryObj<typeof Day>;

export const Primary: Story = {
  args: {
    day: 10,
  },
};
