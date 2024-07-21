import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './';
import { Palette } from '../../../themes/lightTheme';

const meta = {
  title: 'UI/Molecules/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '5rem' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['!autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof Dropdown>;

const children = (
  <>
    <Dropdown.Item value="1">1번</Dropdown.Item>
    <Dropdown.Item value="2">2번</Dropdown.Item>
    <Dropdown.Item value="3">3번</Dropdown.Item>
    <Dropdown.Item value="4">4번</Dropdown.Item>
  </>
);

export const Primary: Story = {
  args: {
    children: children,
    size: 'md',
    variant: 'outlined',
    color: 'primary',
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
        <Dropdown {...args} color={color}>
          {children}
        </Dropdown>
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
        <Dropdown {...args} color={color}>
          {children}
        </Dropdown>
      ))}
    </div>
  ),
};
