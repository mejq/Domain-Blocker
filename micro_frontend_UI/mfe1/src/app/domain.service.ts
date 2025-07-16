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
  domains: BlockedDomain[] = [];
  private apiUrl = 'http://localhost:8080/api/domain-block'; // Backend URL'inizi buraya yazın

  constructor(private http: HttpClient) {}

  blockDomains(domains: string[]): Observable<any> {
    const body = { domains };  // domainleri bir nesne içinde gönderiyoruz
    console.log("Gönderilen body:", body);
    return this.http.post(this.apiUrl, body, { responseType: 'text' as 'json' });
  }
}
