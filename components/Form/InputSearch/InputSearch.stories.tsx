import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import "../../../styles/bootstrap.min.css";
import "../../../styles/theme.scss";

import InputSearchComponent, {
  InputSearchProps,
} from "./InputSearch";

export default {
  title: "Fieldy/Form",
  component: InputSearchComponent,
} as Meta;

const InputSearchTemplate: Story<InputSearchProps> = (args) => (
  <InputSearchComponent {...args} />
);

export const InputSearch = InputSearchTemplate.bind({});
InputSearch.args = {
  placeholder: "Search",
  className: "col-md-6",
  id: "search",
};
