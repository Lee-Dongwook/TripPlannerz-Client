import { Button } from "./Button";
import { StoryFn, Meta } from "@storybook/react";
import { ButtonProps } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    label: { control: "text" },
    onClick: { action: "clicked" },
  },
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const UpdatePasswordButton = Template.bind({});
UpdatePasswordButton.args = {
  label: "변경하기",
};

export const AuthenticateButton = Template.bind({});
AuthenticateButton.args = {
  label: "인증하기",
};
