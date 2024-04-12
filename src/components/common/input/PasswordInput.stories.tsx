import { PasswordInput } from "./PasswordInput";
import { StoryFn, Meta } from "@storybook/react";
import { PasswordInputProps } from "./PasswordInput";

export default {
  title: "Components/PasswordInput",
  component: PasswordInput,
  argTypes: {
    placeholder: { control: "text" },
    onChange: { action: "changed" },
  },
} as Meta;

const Template: StoryFn<PasswordInputProps> = (args) => (
  <PasswordInput {...args} />
);

export const NewPassword = Template.bind({});
NewPassword.args = {
  placeholder: "새로운 비밀번호를 입력해주세요",
};

export const CurrentPassword = Template.bind({});
CurrentPassword.args = {
  placeholder: "현재 비밀번호를 입력해주세요",
};
