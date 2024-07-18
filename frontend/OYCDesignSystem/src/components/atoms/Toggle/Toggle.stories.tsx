import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';
import { Palette } from '../../../themes/lightTheme';

const meta = {
  title: 'UI/Atoms/Toggle',
  component: Toggle,
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
      description: '적용할 크기입니다.',
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Primary: Story = {
  args: {
    color: 'primary',
    size: 'sm',
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
        <Toggle {...args} color={color}>
          {color}
        </Toggle>
      ))}
    </div>
  ),
};
