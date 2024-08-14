import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { Palette } from '../../../themes/lightTheme';
import { ReactComponent as Arrow } from '../../../assets/icons/arrow.svg';

const meta = {
  title: 'UI/Molecules/IconButton',
  component: IconButton,
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
      description: '버튼 안에 표시할 아이콘입니다.',
      control: false,
    },
    size: {
      description: '버튼의 크기입니다.',
    },
    color: {
      description: '적용할 컬러 팔레트입니다.',
    },
    disabled: {
      description: '버튼의 비활성화 여부입니다.',
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    children: (
      <>
        <Arrow width={32} />
      </>
    ),
    size: 'md',
    color: 'primary',
    disabled: false,
  },
};

const colorList: Palette[] = ['primary', 'secondary', 'success', 'danger'];

export const Contained: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {colorList.map((color) => (
        <IconButton {...args} color={color}>
          {color}
        </IconButton>
      ))}
    </div>
  ),
};

export const Outlined: Story = {
  args: {
    ...Primary.args,
  },
  parameters: {
    controls: false,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {colorList.map((color) => (
        <IconButton {...args} color={color}>
          {color}
        </IconButton>
      ))}
    </div>
  ),
};
