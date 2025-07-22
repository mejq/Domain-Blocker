import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

export interface BlockedDomain {
  id: string;
  domainName: string;
  appliedAt: string;
}

@Injectable({
  providedIn: 'root' //s
})
export class DomainBlockService {
  private apiUrl = 'http://localhost:8080/api/domain-block';
  constructor(private http: HttpClient) {}

  blockDomains(domains: string[]): Observable<any> {
    console.log("Gönderilen body:", {domains});
    return this.http.post(this.apiUrl, {domains}, { responseType: 'text' as 'json' });
  }
}
