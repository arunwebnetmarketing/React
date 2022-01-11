import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import "../../../styles/bootstrap.min.css";
import "../../../styles/theme.scss";

import SelectComponent, { SelectProps } from "./Select";

export default {
  title: "Fieldy/Form/Select",
  component: SelectComponent,
} as Meta;

const SelectTemplate: Story<SelectProps> = (args) => (
  <SelectComponent {...args} />
);

export const Select = SelectTemplate.bind({});
Select.args = {
  label: "Select Number",
  name: "select-number",
  placeholder: "Choose Number...",
  className: "col-lg-6",
  options: [
    { name: "One", value: "1" },
    { name: "Two", value: "2" },
    { name: "Three", value: "3" },
    { name: "Four", value: 4 },
    { name: "Five", value: 5 },
  ],
};

export const SelectWithError = SelectTemplate.bind({});
SelectWithError.args = {
  label: "Select Number",
  name: "select-number",
  options: [
    { name: "One", value: "1" },
    { name: "Two", value: "2" },
    { name: "Three", value: "3" },
    { name: "Four", value: "4" },
    { name: "Five", value: "5" },
  ],
  placeholder: "Choose Number...",
  className: "col-lg-6",
  errors: {
    "select-number": {
      message: "Select Number Is Required",
      type: "required",
    },
  },
  errorId: "select-number-error",
};
