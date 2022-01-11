import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import "../../../styles/bootstrap.min.css";
import "../../../styles/theme.scss";

import TextareaComponent, { TextareaProps } from "./Textarea";

export default {
  title: "Fieldy/Form/Textarea",
  component: TextareaComponent,
} as Meta;

const TextareaTemplate: Story<TextareaProps> = (args) => (
  <TextareaComponent {...args} />
);

export const Textarea = TextareaTemplate.bind({});
Textarea.args = {
  label: "Message",
  name: "message",
  placeholder: "Enter Message",
  className: "col-md-6",
};

export const TextareaWithError = TextareaTemplate.bind({});
TextareaWithError.args = {
  label: "Message",
  name: "message",
  placeholder: "Enter Message",
  className: "col-md-6",
  errors: {
    message: { message: "Message Is Required", type: "required" },
  },
  errorId: "message-error",
};
