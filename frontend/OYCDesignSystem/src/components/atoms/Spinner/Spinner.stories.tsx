import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta = {
  title: 'UI/Atoms/Spinner',
  component: Spinner,
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
    size: {
      description: '스피너의 크기입니다.',
    },
    color: {
      description: '스피너의 색상입니다.',
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Primary: Story = {
  args: {
    size: 'md',
    color: 'primary',
  },
};
