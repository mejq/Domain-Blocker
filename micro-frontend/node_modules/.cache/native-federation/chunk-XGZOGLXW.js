import{InjectionToken as s}from"@angular/core";var R=new s("");function p(o,n){n=encodeURIComponent(n);for(let e of o.split(";")){let r=e.indexOf("="),[c,i]=r==-1?[e,""]:[e.slice(0,r),e.slice(r+1)];if(c.trim()===n)return decodeURIComponent(i)}return null}var u="browser",f="server";function d(o){return o===u}function k(o){return o===f}var t=class{};export{R as a,p as b,u as c,f as d,d as e,k as f,t as g};/*! Bundled license information:

@angular/common/fesm2022/dom_tokens-rA0ACyx7.mjs:
@angular/common/fesm2022/xhr-BfNfxNDv.mjs:
  (**
   * @license Angular v19.2.14
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/