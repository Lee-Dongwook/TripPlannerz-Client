import {Meta, StoryObj} from '@storybook/react';

import MyPage from '@/ui/my/my';

const meta: Meta<typeof MyPage> = {
    component: MyPage,
};

export default meta;
type Story = StoryObj<typeof MyPage>

export const MyPageStory: Story = {
    args: {

    },
};