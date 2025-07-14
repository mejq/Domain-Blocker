import { RouterOutlet } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {DomainBlockService, BlockedDomain} from './domain.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
title = 'mfe1';

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const eventToSend = new CustomEvent('domain-changed-from-micro1', {
      detail: value
    });
    window.dispatchEvent(eventToSend);
  }

  ngOnInit() {
    window.addEventListener('reset-micro1-form',this.domainForm.reset); //dikkat
  }
  ngOnDestroy() {
    window.removeEventListener('reset-micro1-form',this.domainForm.reset);
  }

  domainForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private domainService: DomainBlockService
  ) {
    this.domainForm = this.fb.group({
      domain: ['', [Validators.required, Validators.pattern('^(?!://)([a-zA-Z0-9-_]+\\.)+[a-zA-Z]{2,6}$')]]
    });
  }

  //ÖNEMLİ addddomainde dbden mi var yok kontrolu yapılsın uoksa halıhazırda micro2 de loaddomainsten mi alınsın
  addDomain() {
    const domainValue = this.domainForm.value.domain;
    const event = new CustomEvent('add-domain-to-micro2',{
      detail: domainValue  // domaini micro2 ye gonderdık orada tablo eklememelrı olck
    })
    this.domainForm.reset();
    console.log(domainValue);
  }
}
