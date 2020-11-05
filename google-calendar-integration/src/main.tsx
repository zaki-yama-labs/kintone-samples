import React from "react";
import { render } from "react-dom";

declare let kintone: any;

// Example
kintone.events.on("portal.show", (event: any) => {
  console.log("ts: portal.show", event);
  const App = <div>hello</div>;
  render(App, document.getElementsByClassName("ocean-portal-body")[0]);
});
