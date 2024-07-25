import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';

const meta = {
  title: 'UI/Molecules/Calendar',
  component: Calendar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '5rem', backgroundColor: '#eee' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    width: {
      description: '달력의 가로 길이입니다.',
    },
    year: {
      description: '달력의 연도',
    },
    month: {
      description: '달력의 월',
    },
  },
  tags: ['!autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Primary: Story = {
  args: { width: '328px' },
};
