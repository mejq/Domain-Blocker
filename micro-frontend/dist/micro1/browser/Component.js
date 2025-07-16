import "./chunk-YQOESBWP.js";

// micro1/src/app/add-domain.component.ts
import { Component } from "@angular/core";
import { FormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import * as i02 from "@angular/core";
import * as i12 from "@angular/forms";

// micro1/src/app/domain.service.ts
import { Injectable } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var DomainBlockService = class _DomainBlockService {
  http;
  domains = [];
  apiUrl = "http://localhost:8080/api/domain-block";
  // Backend URL'inizi buraya yazın
  constructor(http) {
    this.http = http;
  }
  blockDomains(domains) {
    return this.http.post(this.apiUrl, { domains }, { responseType: "text" });
  }
  static \u0275fac = function DomainBlockService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DomainBlockService)(i0.\u0275\u0275inject(i1.HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ i0.\u0275\u0275defineInjectable({ token: _DomainBlockService, factory: _DomainBlockService.\u0275fac, providedIn: "root" });
};

// micro1/src/app/add-domain.component.ts
var App = class _App {
  fb;
  domainService;
  onInputChange(event) {
    const value = event.target.value;
    const eventToSend = new CustomEvent("domain-changed-from-micro1", {
      detail: value
    });
    window.dispatchEvent(eventToSend);
  }
  ngOnInit() {
    window.addEventListener("reset-micro1-form", this.domainForm.reset);
  }
  ngOnDestroy() {
    window.removeEventListener("reset-micro1-form", this.domainForm.reset);
  }
  domainForm;
  constructor(fb, domainService) {
    this.fb = fb;
    this.domainService = domainService;
    this.domainForm = this.fb.group({
      domain: ["", [Validators.required, Validators.pattern("^(?!://)([a-zA-Z0-9-_]+\\.)+[a-zA-Z]{2,6}$")]]
    });
  }
  //ÖNEMLİ addddomainde dbden mi var yok kontrolu yapılsın uoksa halıhazırda micro2 de loaddomainsten mi alınsın
  addDomain() {
    const domainValue = this.domainForm.value.domain;
    const event = new CustomEvent("add-domain-to-micro2", {
      detail: domainValue
      // domaini micro2 ye gonderdık orada tablo eklememelrı olck
    });
    this.domainForm.reset();
    console.log(domainValue);
  }
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)(i02.\u0275\u0275directiveInject(i12.FormBuilder), i02.\u0275\u0275directiveInject(DomainBlockService));
  };
  static \u0275cmp = /* @__PURE__ */ i02.\u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 12, vars: 2, consts: [[1, "brand-name"], [1, "content"], [3, "ngSubmit", "formGroup"], ["type", "text", "formControlName", "domain", "placeholder", "Enter domain"], ["type", "submit", 3, "disabled"]], template: function App_Template(rf, ctx) {
    if (rf & 1) {
      i02.\u0275\u0275elementStart(0, "header");
      i02.\u0275\u0275text(1, "Micro1");
      i02.\u0275\u0275elementEnd();
      i02.\u0275\u0275elementStart(2, "router-outlet")(3, "main");
      i02.\u0275\u0275element(4, "header", 0);
      i02.\u0275\u0275elementStart(5, "section", 1)(6, "form", 2);
      i02.\u0275\u0275listener("ngSubmit", function App_Template_form_ngSubmit_6_listener() {
        return ctx.addDomain();
      });
      i02.\u0275\u0275elementStart(7, "h4");
      i02.\u0275\u0275text(8, "Domain Block");
      i02.\u0275\u0275elementEnd();
      i02.\u0275\u0275element(9, "input", 3);
      i02.\u0275\u0275elementStart(10, "button", 4);
      i02.\u0275\u0275text(11, "Add");
      i02.\u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      i02.\u0275\u0275advance(6);
      i02.\u0275\u0275property("formGroup", ctx.domainForm);
      i02.\u0275\u0275advance(4);
      i02.\u0275\u0275property("disabled", ctx.domainForm.invalid);
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, i12.\u0275NgNoValidate, i12.DefaultValueAccessor, i12.NgControlStatus, i12.NgControlStatusGroup, i12.FormGroupDirective, i12.FormControlName, FormsModule, RouterOutlet], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i02.\u0275setClassDebugInfo(App, { className: "App", filePath: "micro1/src/app/add-domain.component.ts", lineNumber: 18 });
})();
export {
  App
};
//# sourceMappingURL=Component.js.map
