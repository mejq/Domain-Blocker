import {
  __spreadValues
} from "./chunk-YQOESBWP.js";

// micro1/src/app/app.routes.ts
var routes = [
  __spreadValues({
    path: "app",
    // :App,
    loadComponent: () => import("./Component.js").then((m) => m.App)
  }, typeof ngServerMode !== "undefined" && ngServerMode ? { \u0275entryName: "src/app/add-domain.component.ts" } : {}),
  {
    path: "",
    redirectTo: "app",
    pathMatch: "full"
  }
];
export {
  routes
};
//# sourceMappingURL=routes.js.map
