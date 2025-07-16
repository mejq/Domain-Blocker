import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DomainBlockService, BlockedDomain} from './domain.service';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  title = 'mfe2';
  domains: BlockedDomain[] = [];  // Arayüzde görüntülenecek domain list
  message: string = '';

  constructor(private domainService: DomainBlockService) {}

  ngOnInit(): void {
    this.loadBlockedDomains();
    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost:4200') return;
      const newDomain: BlockedDomain = event.data.domain;
      console.log("mfe2 ye ulasıldı : "+ newDomain);
      if (newDomain && !this.domains.some(d => d.domainName === newDomain.domainName)) {
        //this.domains.push(newDomain);
        this.loadBlockedDomains();
      }
    });
  }

  loadBlockedDomains() {
    this.domainService.getBlockedDomains().subscribe({
      next: (data: BlockedDomain[]) => {
        this.domains = data.map(item => {
          return {
            id: item.id,
            domainName: item.domainName,
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
        this.loadBlockedDomains();
      },
    });
  }
}
