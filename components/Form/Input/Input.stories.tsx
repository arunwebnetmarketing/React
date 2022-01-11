import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import "../../../styles/bootstrap.min.css";
import "../../../styles/theme.scss";

import InputComponent, { InputProps } from "./Input";

export default {
  title: "Fieldy/Form/Input",
  component: InputComponent,
} as Meta;

const Template: Story<InputProps> = (args) => (
  <InputComponent {...args} />
);

export const Text = Template.bind({});
Text.args = {
  type: "text",
  label: "Name",
  name: "name",
  placeholder: "Enter Your Name",
  className: "col-md-6",
};

export const Number = Template.bind({});
Number.args = {
  type: "number",
  label: "Mobile No",
  name: "mobileno",
  placeholder: "Enter Your Mobile No",
  className: "col-md-6",
};

export const Email = Template.bind({});
Email.args = {
  type: "email",
  label: "Email",
  name: "email",
  placeholder: "Enter Your Email",
  className: "col-md-6",
};

export const Date = Template.bind({});
Date.args = {
  type: "date",
  label: "Date",
  name: "date",
  className: "col-md-6",
};

export const Time = Template.bind({});
Time.args = {
  type: "time",
  label: "Time",
  name: "time",
  className: "col-md-6",
};

export const Password = Template.bind({});
Password.args = {
  type: "password",
  label: "Password",
  name: "password",
  className: "col-md-6",
};

export const InputWithIcon = Template.bind({});
InputWithIcon.args = {
  type: "text",
  name: "name",
  placeholder: "Enter Your Name",
  className: "col-md-6",
  icon: "fa-user",
};

export const InputWithError = Template.bind({});
InputWithError.args = {
  type: "text",
  label: "Name",
  name: "name",
  placeholder: "Enter Your Name",
  className: "col-md-6",
  errors: { name: { message: "Name Is Required", type: "required" } },
  errorId: "name-error",
};
