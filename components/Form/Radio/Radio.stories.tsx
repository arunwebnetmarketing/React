import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import "../../../styles/bootstrap.min.css";
import "../../../styles/theme.scss";

import RadioComponent, { RadioProps } from "./Radio";

export default {
  title: "Fieldy/Form/Radio",
  component: RadioComponent,
} as Meta;

const RadioTemplate: Story<RadioProps> = (args) => (
  <RadioComponent {...args} />
);

export const RadioVertical = RadioTemplate.bind({});
RadioVertical.args = {
  label: "Select Number",
  name: "select-number",
  options: [
    { name: "One", value: "1" },
    { name: "Two", value: "2" },
    { name: "Three", value: "3" },
    { name: "Four", value: 4 },
    { name: "Five", value: 5 },
  ],
  vertical: true,
};

export const RadioVerticalWithError = RadioTemplate.bind({});
RadioVerticalWithError.args = {
  label: "Select Number",
  name: "select-number",
  options: [
    { name: "One", value: "1" },
    { name: "Two", value: "2" },
    { name: "Three", value: "3" },
    { name: "Four", value: "4" },
    { name: "Five", value: "5" },
  ],
  vertical: true,
  errors: {
    "select-number": {
      message: "Select Number Is Required",
      type: "required",
    },
  },
  errorId: "select-number-error",
};

export const RadioHorizontal = RadioTemplate.bind({});
RadioHorizontal.args = {
  label: "Select Number",
  name: "select-number",
  options: [
    { name: "One", value: "1" },
    { name: "Two", value: "2" },
    { name: "Three", value: "3" },
    { name: "Four", value: 4 },
    { name: "Five", value: 5 },
  ],
  vertical: false,
};

export const RadioHorizontalWithError = RadioTemplate.bind({});
RadioHorizontalWithError.args = {
  label: "Select Number",
  name: "select-number",
  options: [
    { name: "One", value: "1" },
    { name: "Two", value: "2" },
    { name: "Three", value: "3" },
    { name: "Four", value: "4" },
    { name: "Five", value: "5" },
  ],
  vertical: false,
  errors: {
    "select-number": {
      message: "Select Number Is Required",
      type: "required",
    },
  },
  errorId: "select-number-error",
};
