import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

const meta = {
  title: 'UI/Atoms/Chip',
  component: Chip,
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
    children: {
      description: '내용입니다.',
    },
    fill: {
      description: '배경 색상입니다.',
      control: {
        type: 'color',
      },
    },
    color: {
      description: '글자 색상입니다.',
      control: {
        type: 'color',
      },
    },
    size: {
      description: '크기입니다.',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof Chip>;

export const Primary: Story = {
  args: {
    children: 'Chip1',
    color: '#fff',
    fill: '#000',
  },
};
