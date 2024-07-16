import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';
import { Palette } from '../../../themes/lightTheme';

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
    color: 'primary',
    size: 'md',
    weight: 'medium',
  },
};
