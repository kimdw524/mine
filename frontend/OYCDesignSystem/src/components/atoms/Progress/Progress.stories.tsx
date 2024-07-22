import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta = {
  title: 'UI/Atoms/Progress',
  component: Progress,
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
  argTypes: {
    transparentBackground: {
      description: '배경색이 투명한지 여부입니다.',
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof Progress>;

export const Primary: Story = {
  args: {
    size: 'md',
    variant: 'rounded',
    color: 'primary',
    value: 50,
    max: 100,
  },
};
