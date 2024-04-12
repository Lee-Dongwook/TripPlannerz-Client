import { MyAuthForm } from "./MyAuthForm";
import { StoryFn, Meta } from "@storybook/react";
import { MyAuthFormProps } from "./MyAuthForm";

export default {
  title: "Components/AuthForm",
  component: MyAuthForm,
} as Meta;

const Template: StoryFn<MyAuthFormProps> = (args) => <MyAuthForm {...args} />;

export const PasswordChangeForm = Template.bind({});
PasswordChangeForm.args = {
  accountState: true,
};

export const AuthenticationForm = Template.bind({});
AuthenticationForm.args = {
  accountState: false,
};
