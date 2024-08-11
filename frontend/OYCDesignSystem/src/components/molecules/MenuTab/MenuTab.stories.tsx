import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MenuTab } from './MenuTab';
import { MenuTabProps } from './MenuTab.types';
import { Palette } from '../../../themes/lightTheme';


const meta = {
  title: 'UI/Molecules/MenuTab',
  component: MenuTab,
  argTypes: {
    size: {
      description: 'MenuTab의 크기입니다.',
      control: { type: 'select', options: ['sm', 'md', 'lg'] },
    },
    color: {
      description: '선택된 버튼의 색입니다.',
      control: { type: 'select', options: ['primary', 'secondary', 'default'] },
    },
    children: {
      description: 'Tab의 갯수입니다.',
      control: { type: 'object' },
    },
    variant: {
      description: 'MenuTab의 스타일입니다.',
    },
    border: {
      description: '테두리의 둥근 정도입니다.',
    }
  },
} as Meta<MenuTabProps>;

export default meta;

type Story = StoryObj<typeof MenuTab>;

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
    variant: 'contained',
    border: 0
  },
};

const colorList: Palette[] = ['primary', 'secondary', 'success', 'danger'];

export const Contained: Story = {
  ...Template,
  args: {
    size: 'md',
    color: 'primary',
    children: ['Tab1', 'Tab2', 'Tab3'],
    variant: 'contained',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {colorList.map((color) => (
        <MenuTab {...args} color={color}>
        </MenuTab>
      ))}
    </div>
  ),
};


export const Outlined: Story = {
  ...Template,
  args: {
    size: 'md',
    color: 'primary',
    children: ['Tab1', 'Tab2', 'Tab3'],
    variant: 'outlined',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {colorList.map((color) => (
        <MenuTab {...args} color={color}>
        </MenuTab>
      ))}
    </div>
  ),
};
