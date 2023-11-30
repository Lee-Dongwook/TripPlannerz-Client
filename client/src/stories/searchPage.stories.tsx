import {Meta, StoryObj} from '@storybook/react';

import SearchPage from '@/ui/search/search';

const meta: Meta<typeof SearchPage> = {
    component: SearchPage,
};

export default meta;
type Story = StoryObj<typeof SearchPage>

export const SearchPageStory: Story = {
    args: {

    },
};