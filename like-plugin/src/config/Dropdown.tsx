import * as React from "react";

export const Dropdown = () => {
  return (
    <div className="kintoneplugin-dropdown-container">
      <div className="kintoneplugin-dropdown-outer">
        <div className="kintoneplugin-dropdown">
          <div className="kintoneplugin-dropdown-selected">
            <span className="kintoneplugin-dropdown-selected-name">
              Dropdownです
            </span>
          </div>
        </div>
      </div>
      <div className="kintoneplugin-dropdown-list" />
    </div>
    // item: '<div class="kintoneplugin-dropdown-list-item"></div>'
  );
};
