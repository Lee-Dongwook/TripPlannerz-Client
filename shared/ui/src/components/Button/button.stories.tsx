import Button from '.';

export default {
  component: Button,
  title: 'Button',
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      description: 'sample',
    },
    label: {
      description: 'sample',
    },
  },
};

export const Primary = {
  args: {
    backgroundColor: 'bg-blue-500',
    label: 'Primary Button',
  },
};

export const Success = {
  args: {
    backgroundColor: 'bg-yellow-500',
    label: 'Success Button',
  },
};
