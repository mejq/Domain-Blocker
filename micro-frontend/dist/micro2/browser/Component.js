// micro2/src/app/domain-list.component.ts
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import * as i02 from "@angular/core";

// micro2/src/app/domain.service.ts
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
  getBlockedDomains() {
    return this.http.get(this.apiUrl);
  }
  deleteDomain(domain) {
    if (!domain || !domain.domain) {
      console.error("Silme i\u015Flemi i\xE7in domain bilgisi eksik:", domain);
    }
    const url = `${this.apiUrl}/${domain.domain}`;
    console.log("DELETE URL:", url);
    return this.http.delete(url, { responseType: "text" });
  }
  static \u0275fac = function DomainBlockService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DomainBlockService)(i0.\u0275\u0275inject(i1.HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ i0.\u0275\u0275defineInjectable({ token: _DomainBlockService, factory: _DomainBlockService.\u0275fac, providedIn: "root" });
};

// micro2/src/app/domain-list.component.ts
import * as i2 from "@angular/common";
function App_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = i02.\u0275\u0275getCurrentView();
    i02.\u0275\u0275elementStart(0, "tr")(1, "td");
    i02.\u0275\u0275text(2);
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(3, "td");
    i02.\u0275\u0275text(4);
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(5, "td")(6, "button", 3);
    i02.\u0275\u0275listener("click", function App_tr_17_Template_button_click_6_listener() {
      const domain_r2 = i02.\u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = i02.\u0275\u0275nextContext();
      return i02.\u0275\u0275resetView(ctx_r2.removeDomain(domain_r2));
    });
    i02.\u0275\u0275text(7, "Remove");
    i02.\u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const domain_r2 = ctx.$implicit;
    i02.\u0275\u0275advance(2);
    i02.\u0275\u0275textInterpolate(domain_r2.domain);
    i02.\u0275\u0275advance(2);
    i02.\u0275\u0275textInterpolate(domain_r2.appliedAt);
  }
}
function App_p_18_Template(rf, ctx) {
  if (rf & 1) {
    i02.\u0275\u0275elementStart(0, "p");
    i02.\u0275\u0275text(1);
    i02.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = i02.\u0275\u0275nextContext();
    i02.\u0275\u0275advance();
    i02.\u0275\u0275textInterpolate(ctx_r2.message);
  }
}
var App = class _App {
  domainService;
  resetForminMicro1() {
    const event = new CustomEvent("reset-formin-micro1");
    window.dispatchEvent(event);
  }
  domains = [];
  // Arayüzde görüntülenecek domain list
  message = "";
  constructor(domainService) {
    this.domainService = domainService;
  }
  ngOnInit() {
    window.addEventListener("add-domains-to-micro2", this.handleAddDomain);
    this.loadBlockedDomains();
  }
  ngOnDestroy() {
    window.removeEventListener("add-domains-to-micro2", this.handleAddDomain);
  }
  handleAddDomain(event) {
    const newDomain = event.detail;
    if (newDomain && !this.domains.some((d) => d.domain === newDomain.domain)) {
      this.domains.push(newDomain);
      this.loadBlockedDomains();
    }
  }
  loadBlockedDomains() {
    this.domainService.getBlockedDomains().subscribe({
      next: (data) => {
        this.domains = data.map((item) => {
          return {
            id: item.id,
            domain: item.domain,
            appliedAt: item.appliedAt
          };
        });
        console.log("Parsed domains:", this.domains);
      },
      error: (err) => {
        this.message = "Y\xFCkleme hatas\u0131: " + err.message;
      }
    });
  }
  removeDomain(domain) {
    this.domainService.deleteDomain(domain).subscribe({
      next: () => {
        this.domains = this.domains.filter((d) => {
          return d !== domain;
        });
        this.resetForminMicro1();
        this.loadBlockedDomains();
      }
    });
  }
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)(i02.\u0275\u0275directiveInject(DomainBlockService));
  };
  static \u0275cmp = /* @__PURE__ */ i02.\u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 19, vars: 2, consts: [[1, "brand-name"], ["src", "../assets/logo.jpg", "alt", "Logo", 1, "brand-logo"], [1, "content"], [3, "click"], ["border", "1", 2, "border-collapse", "collapse"], [4, "ngFor", "ngForOf"], [4, "ngIf"]], template: function App_Template(rf, ctx) {
    if (rf & 1) {
      i02.\u0275\u0275elementStart(0, "main")(1, "header", 0);
      i02.\u0275\u0275element(2, "img", 1);
      i02.\u0275\u0275elementEnd();
      i02.\u0275\u0275elementStart(3, "section", 2)(4, "button", 3);
      i02.\u0275\u0275listener("click", function App_Template_button_click_4_listener() {
        return ctx.loadBlockedDomains();
      });
      i02.\u0275\u0275text(5, "Refresh Domains");
      i02.\u0275\u0275elementEnd();
      i02.\u0275\u0275elementStart(6, "h4");
      i02.\u0275\u0275text(7, "Blocked Domains");
      i02.\u0275\u0275elementEnd();
      i02.\u0275\u0275elementStart(8, "table", 4)(9, "thead")(10, "tr")(11, "th");
      i02.\u0275\u0275text(12, "Domain");
      i02.\u0275\u0275elementEnd();
      i02.\u0275\u0275elementStart(13, "th");
      i02.\u0275\u0275text(14, "Applied At");
      i02.\u0275\u0275elementEnd();
      i02.\u0275\u0275element(15, "th");
      i02.\u0275\u0275elementEnd()();
      i02.\u0275\u0275elementStart(16, "tbody");
      i02.\u0275\u0275template(17, App_tr_17_Template, 8, 2, "tr", 5);
      i02.\u0275\u0275elementEnd()();
      i02.\u0275\u0275template(18, App_p_18_Template, 2, 1, "p", 6);
      i02.\u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      i02.\u0275\u0275advance(17);
      i02.\u0275\u0275property("ngForOf", ctx.domains);
      i02.\u0275\u0275advance();
      i02.\u0275\u0275property("ngIf", ctx.message);
    }
  }, dependencies: [CommonModule, i2.NgForOf, i2.NgIf, ReactiveFormsModule, FormsModule], styles: ["\n\n/*# sourceMappingURL=styles.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i02.\u0275setClassDebugInfo(App, { className: "App", filePath: "micro2/src/app/domain-list.component.ts", lineNumber: 15 });
})();
export {
  App
};
//# sourceMappingURL=Component.js.map
