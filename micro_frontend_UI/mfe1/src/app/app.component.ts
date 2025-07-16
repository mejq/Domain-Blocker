import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {DomainBlockService} from './domain.service';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'mfe1';

  domainForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private domainService: DomainBlockService
  ) {
    this.domainForm = this.fb.group({
      domain: ['', [Validators.required, Validators.pattern('^(?!://)([a-zA-Z0-9-_]+\\.)+[a-zA-Z]{2,6}$')]]
    });
  }

  addDomain() {
    const domainValue = this.domainForm.value.domain;
    this.domainService.blockDomains([domainValue]).subscribe({
      next: (res) => console.log('Success:', res),
      error: (err) => console.error('Error:', err)
    });

    window.parent.postMessage({ //parent shellimiz
        type: 'add-domain',
        domain: domainValue
      }, 'http://localhost:4200')
  }
}
