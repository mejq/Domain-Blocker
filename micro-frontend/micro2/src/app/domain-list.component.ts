import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {DomainBlockService, BlockedDomain} from './domain.service';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: 'domain_blocker.html',
  styleUrls: ['styles.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})

export class App implements OnInit {

  resetForminMicro1() {
    const event = new CustomEvent('reset-formin-micro1');
    window.dispatchEvent(event);
  }

  domains: BlockedDomain[] = [];  // Arayüzde görüntülenecek domain list
  message: string = '';

  constructor(private domainService: DomainBlockService) {}

  ngOnInit(): void {
    window.addEventListener('add-domains-to-micro2', this.handleAddDomain)
    //window.addEventListener('domain-changed-from-micro1'.this.handleDomainChange);
    this.loadBlockedDomains();
  }
  ngOnDestroy() {
    window.removeEventListener('add-domains-to-micro2', this.handleAddDomain);
  }

  handleAddDomain(event: any) {
    const newDomain: BlockedDomain = event.detail;
    if (newDomain && !this.domains.some(d => d.domain === newDomain.domain)) {
      this.domains.push(newDomain);
      this.loadBlockedDomains();
    }
  }

  loadBlockedDomains() {
    this.domainService.getBlockedDomains().subscribe({
      next: (data: BlockedDomain[]) => {
        this.domains = data.map(item => {
          return {
            id: item.id,
            domain: item.domain,
            appliedAt: item.appliedAt
          };
        });
        console.log('Parsed domains:', this.domains);
      },
      error: (err: any) => {
        this.message = 'Yükleme hatası: ' + err.message;
      }
    });
  }

  removeDomain(domain: BlockedDomain) {
    this.domainService.deleteDomain(domain).subscribe({
      next: () => {
        this.domains = this.domains.filter(d => {
          return d !== domain;
        });
        this.resetForminMicro1() //micro2 ye event gitti
        this.loadBlockedDomains();
      },
    });

  }
}
