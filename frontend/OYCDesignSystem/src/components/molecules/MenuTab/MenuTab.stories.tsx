import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MenuTab } from './MenuTab';
import { MenuTabProps } from './MenuTab.types';

export default {
  title: 'UI/Molecules/MenuTab',
  component: MenuTab,
  argTypes: {
    size: {
      control: { type: 'select', options: ['sm', 'md', 'lg'] },
    },
    color: {
      control: { type: 'select', options: ['primary', 'secondary', 'default'] },
    },
    children: {
      control: { type: 'object' },
    },
  },
} as Meta<MenuTabProps>;

const Template: StoryObj<MenuTabProps> = {
  render: (args) => (
    <MenuTab {...args}>
      {args.children.map((child, index) => (
        <div key={index}>{child}</div>
      ))}
    </MenuTab>
  ),
};

export const Primary = {
  ...Template,
  args: {
    size: 'md',
    color: 'primary',
    children: ['Tab1', 'Tab2', 'Tab3'],
    variant: 'rounded',
  },
};
