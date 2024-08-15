import type { Meta, StoryObj } from '@storybook/react';
import { CheckBox } from './CheckBox';

const meta = {
  title: 'UI/Atoms/CheckBox',
  component: CheckBox,
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
  tags: ['autodocs'],
} satisfies Meta<typeof CheckBox>;

export default meta;

type Story = StoryObj<typeof CheckBox>;

export const Primary: Story = {
  args: {},
};
