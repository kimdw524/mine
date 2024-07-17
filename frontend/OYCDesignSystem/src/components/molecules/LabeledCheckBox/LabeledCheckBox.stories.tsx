import type { Meta, StoryObj } from '@storybook/react';
import { LabeledCheckBox } from './LabeledCheckBox';

const meta = {
  title: 'UI/Molecules/LabeledCheckBox',
  component: LabeledCheckBox,
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
      description: 'Label에 표시할 내용입니다.',
    },
    size: {
      description: '컴포넌트의 크기입니다.',
    },
    color: {
      description: '체크박스에 적용할 컬러 팔레트입니다.',
    },
    labelColor: {
      description: '라벨에 적용할 컬러 팔레트입니다.',
    },
    weight: {
      description: '라벨의 굵기입니다.',
    },
    checked: {
      description: '초기 체크박스의 체크 여부입니다.',
    },
    onChange: {
      description: '체크박스의 체크 여부가 변경되면 실행되는 콜백 함수 입니다.',
    },
  },
} satisfies Meta<typeof LabeledCheckBox>;

export default meta;

type Story = StoryObj<typeof LabeledCheckBox>;

export const Primary: Story = {
  args: {
    children: 'LabeledCheckBox',
    size: 'md',
    color: 'primary',
  },
};
