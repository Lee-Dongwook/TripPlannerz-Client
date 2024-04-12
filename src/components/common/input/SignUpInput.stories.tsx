import { SignUpInput } from "./SignUpInput";
import { StoryFn, Meta } from "@storybook/react";
import { SignUpInputProps } from "./SignUpInput";

export default {
  title: "Components/SignUpInput",
  component: SignUpInput,
  argTypes: {
    placeholder: { control: "text" },
    onChange: { action: "changed" },
  },
} as Meta;

const Template: StoryFn<SignUpInputProps> = (args) => <SignUpInput {...args} />;

export const Primary = Template.bind({});

export const Secondary = Template.bind({});
