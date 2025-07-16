import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {observable, Observable} from 'rxjs';

export interface BlockedDomain {
  id: string;
  domainName: string;
  appliedAt: string;
}
@Injectable({
  providedIn: 'root'
})
export class DomainBlockService {
  domains: BlockedDomain[] = [];
  private apiUrl = 'http://localhost:8080/api/domain-block'; // Backend URL'inizi buraya yazın

  constructor(private http: HttpClient) {}

  getBlockedDomains(): Observable<BlockedDomain[]>  {
    return this.http.get<BlockedDomain[]>(this.apiUrl);
  }

  deleteDomain(domain: BlockedDomain): Observable<any> {
    if (!domain || !domain.domainName) {
      console.error('Silme işlemi için domain bilgisi eksik:', domain);
    }
    const url = `${this.apiUrl}/${domain.domainName}`;
    console.log('DELETE URL:', url);
    return this.http.delete(url, {responseType: 'text'});
  }
}
