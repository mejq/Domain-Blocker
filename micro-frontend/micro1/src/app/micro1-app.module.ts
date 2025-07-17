import { createCustomElement } from '@angular/elements';
import { App } from './add-domain.component';
import { Injector, NgModule, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [BrowserModule],
})
export class Micro1AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    const el = createCustomElement(App, { injector: this.injector });
    customElements.define('micro1-root', el);
  }
}
