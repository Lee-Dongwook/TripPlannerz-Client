import {Meta, StoryObj} from '@storybook/react';

import DetailPage from '@/ui/detail/detail';

const meta: Meta<typeof DetailPage> = {
    component: DetailPage,
};

export default meta;
type Story = StoryObj<typeof DetailPage>

export const DetailPageStory: Story = {
    args: {

    },
};