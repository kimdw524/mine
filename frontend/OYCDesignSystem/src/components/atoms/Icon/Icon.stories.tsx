import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { ReactComponent as Bars3 } from '../../../assets/icons/bars-3.svg';
import { ReactComponent as ArrowLeft } from '../../../assets/icons/arrow-left.svg';

const meta = {
  title: 'UI/Atoms/Icon',
  component: Icon,
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
      description: '아이콘에 적용할 색상입니다.',
    },
    size: {
      description: '아이콘 크기입니다.',
    },
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof Icon>;

const iconList = [<Bars3 />, <ArrowLeft />];

export const Primary: Story = {
  args: {
    color: 'primary',
    size: 'md',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {iconList.map((icon) => (
        <Icon {...args}>{icon}</Icon>
      ))}
    </div>
  ),
};
