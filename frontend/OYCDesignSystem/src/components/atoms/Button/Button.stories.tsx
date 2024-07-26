import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Palette } from '../../../themes/lightTheme';

const meta = {
  title: 'UI/Atoms/Button',
  component: Button,
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
    size: {
      description: '버튼의 크기입니다.',
    },
    variant: {
      description: '버튼의 스타일입니다.',
    },
    color: {
      description: '적용할 컬러 팔레트입니다.',
    },
    disabled: {
      description: '버튼의 비활성화 여부입니다.',
    },
    fullWidth: {
      description: '`width`를 상위 노드의 크기에 맞출지 여부입니다.',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    size: 'md',
    variant: 'contained',
    color: 'primary',
    disabled: false,
    fullWidth: false,
  },
};

const colorList: Palette[] = ['primary', 'secondary', 'success', 'danger'];

export const Contained: Story = {
  args: {
    ...Primary.args,
    variant: 'contained',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {colorList.map((color) => (
        <Button {...args} color={color}>
          {color}
        </Button>
      ))}
    </div>
  ),
};

export const Outlined: Story = {
  args: {
    ...Primary.args,
    variant: 'outlined',
  },
  parameters: {
    controls: false,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {colorList.map((color) => (
        <Button {...args} color={color}>
          {color}
        </Button>
      ))}
    </div>
  ),
};
