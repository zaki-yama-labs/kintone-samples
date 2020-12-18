import React from "react";
import { Dropdown } from "./Dropdown";

export default {
  title: "Dropdown",
  decorators: [
    (Story: any) => (
      <div className="kintoneplugin">
        <Story />
      </div>
    ),
  ],
};

export const withText = () => <Dropdown />;
