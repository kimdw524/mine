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
    children: {
      description: '버튼 안에 표시할 텍스트입니다.',
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Primary: Story = {
  args: {
    children: '',
  },
  render: (args) => <Spinner {...args}></Spinner>,
};
