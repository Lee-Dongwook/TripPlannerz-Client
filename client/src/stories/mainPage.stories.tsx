import {Meta, StoryObj} from '@storybook/react';

import MainPage from '@/ui/main/main';

const meta: Meta<typeof MainPage> = {
    component: MainPage,
};

export default meta;
type Story = StoryObj<typeof MainPage>

export const MainPageStory: Story = {
    args: {

    },
};