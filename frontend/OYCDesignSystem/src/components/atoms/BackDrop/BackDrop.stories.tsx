import type { Meta, StoryObj } from '@storybook/react';
import { BackDrop } from './BackDrop';

const meta = {
  title: 'UI/Atoms/BackDrop',
  component: BackDrop,
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
    opacity: {
      description: '투명도입니다.',
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
    blur: {
      description: '블러처리 정도입니다.',
      control: {
        type: 'range',
        min: 1,
        max: 10,
        step: 0.1,
      },
    },
  },
} satisfies Meta<typeof BackDrop>;

export default meta;

type Story = StoryObj<typeof BackDrop>;

export const Primary: Story = {
  args: {
    children: '',
    opacity: 0.4,
    blur: 0.4,
  },
  render: (args) => (
    <>
      <div style={{ padding: '1rem' }}>
        <div>this is for test backdrop</div>
        <div>this is for test backdrop</div>
        <div>this is for test backdrop</div>
        <div>this is for test backdrop</div>
        <div>this is for test backdrop</div>
        <div>this is for test backdrop</div>
        <div>this is for test backdrop</div>
        <div>this is for test backdrop</div>
      </div>
      <BackDrop {...args}></BackDrop>
    </>
  ),
};
