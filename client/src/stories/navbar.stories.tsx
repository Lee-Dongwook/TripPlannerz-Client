import { Meta, StoryObj } from '@storybook/react';

import Navbar from '@/ui/navbar/navbar';

const meta: Meta<typeof Navbar> = {
  component: Navbar,
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const NavbarStory: Story = {
  args: {},
};
