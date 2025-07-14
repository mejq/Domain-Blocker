import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {observable, Observable} from 'rxjs';

export interface BlockedDomain {
  id: string;
  domain: string;
  appliedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class DomainBlockService {
  domains: BlockedDomain[] = [];
  private apiUrl = 'http://localhost:8080/api/domain-block'; // Backend URL'inizi buraya yazın

  constructor(private http: HttpClient) {}

  blockDomains(domains: string[]): Observable<any> {
    return this.http.post(this.apiUrl, {domains},{responseType:'text'});
  }
}
