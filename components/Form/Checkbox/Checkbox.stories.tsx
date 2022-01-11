import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import "../../../styles/bootstrap.min.css";
import "../../../styles/theme.scss";

import CheckboxComponent, { CheckboxProps } from "./Checkbox";

export default {
  title: "Fieldy/Form/Checkbox",
  component: CheckboxComponent,
} as Meta;

const CheckboxTemplate: Story<CheckboxProps> = (args) => (
  <CheckboxComponent {...args} />
);

export const CheckboxVertical = CheckboxTemplate.bind({});
CheckboxVertical.args = {
  label: "Select Numbers",
  name: "select-numbers",
  options: [
    { name: "One", value: "1" },
    { name: "Two", value: "2" },
    { name: "Three", value: "3" },
    { name: "Four", value: 4 },
    { name: "Five", value: 5 },
  ],
  vertical: true,
};

export const CheckboxVerticalWithError = CheckboxTemplate.bind({});
CheckboxVerticalWithError.args = {
  label: "Select Numbers",
  name: "select-numbers",
  options: [
    { name: "One", value: "1" },
    { name: "Two", value: "2" },
    { name: "Three", value: "3" },
    { name: "Four", value: "4" },
    { name: "Five", value: "5" },
  ],
  vertical: true,
  errors: {
    "select-numbers": {
      message: "Select Numbers Is Required",
      type: "required",
    },
  },
  errorId: "select-numbers-error",
};

export const CheckboxHorizontal = CheckboxTemplate.bind({});
CheckboxHorizontal.args = {
  label: "Select Numbers",
  name: "select-numbers",
  options: [
    { name: "One", value: "1" },
    { name: "Two", value: "2" },
    { name: "Three", value: "3" },
    { name: "Four", value: 4 },
    { name: "Five", value: 5 },
  ],
  vertical: false,
};

export const CheckboxHorizontalWithError = CheckboxTemplate.bind({});
CheckboxHorizontalWithError.args = {
  label: "Select Numbers",
  name: "select-numbers",
  options: [
    { name: "One", value: "1" },
    { name: "Two", value: "2" },
    { name: "Three", value: "3" },
    { name: "Four", value: "4" },
    { name: "Five", value: "5" },
  ],
  vertical: false,
  errors: {
    "select-numbers": {
      message: "Select Numbers Is Required",
      type: "required",
    },
  },
  errorId: "select-numbers-error",
};
