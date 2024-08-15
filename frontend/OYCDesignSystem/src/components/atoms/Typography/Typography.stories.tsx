import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';
import { Palette } from '../../../themes/lightTheme';
import { FontSize } from '../../../themes/themeBase';

const meta = {
  title: 'UI/Atoms/Typography',
  component: Typography,
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
      description: 'text를 입력해주세요',
    },
    color: {
      description: '적용할 컬러 팔레트입니다.',
    },
    size: {
      description: '적용할 사이즈입니다.',
    },
    weight: {
      description: '적용할 굵기입니다.',
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof Typography>;

export const Primary: Story = {
  args: {
    children: 'Typography',
    color: 'primary',
    size: 'md',
    weight: 'medium',
  },
};

const colorList: Palette[] = ['primary', 'secondary', 'success', 'danger'];

export const Default: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {colorList.map((color) => (
        <Typography {...args} color={color}>
          {color}
        </Typography>
      ))}
    </div>
  ),
};

const sizeList: FontSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export const Sized: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {sizeList.map((s) => (
        <Typography {...args} size={s}>
          {Primary.args?.children}
        </Typography>
      ))}
    </div>
  ),
};
