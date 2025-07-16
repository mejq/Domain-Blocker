// node_modules/@angular/core/fesm2022/primitives/di.mjs
var _currentInjector = void 0;
function getCurrentInjector() {
    return _currentInjector;
}
function setCurrentInjector(injector) {
    const former = _currentInjector;
    _currentInjector = injector;
    return former;
}
var NOT_FOUND = Symbol("NotFound");
var NotFoundError = class extends Error {
    constructor(message) {
        super(message);
    }
};
function isNotFound(e) {
    return e === NOT_FOUND || e instanceof NotFoundError;
}
export { getCurrentInjector, setCurrentInjector, NOT_FOUND, NotFoundError, isNotFound };
/*! Bundled license information:

@angular/core/fesm2022/primitives/di.mjs:
  (**
   * @license Angular v19.2.14
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
