import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface BlockedDomain {
  id: string;
  domainName: string;
  appliedAt: string;
}
@Injectable({
  providedIn: 'root'
})
export class DomainBlockService {
  private apiUrl = 'http://localhost:8080/api/domain-block';

  constructor(private http: HttpClient) {}

  getBlockedDomains(): Observable<BlockedDomain[]>  {
    return this.http.get<BlockedDomain[]>(this.apiUrl);
  }

  searchBlockedDomains(search: string): Observable<BlockedDomain[]> {
    const url = `${this.apiUrl}/search?search=${encodeURIComponent(search)}`;
    console.log('API URL:', url);
    return this.http.get<BlockedDomain[]>(url);
  }

  deleteDomain(domain: BlockedDomain): Observable<any> {
    if (!domain || !domain.domainName) {
      console.error('Silme işlemi için domain bilgisi eksik:', domain);
    }
    const url = `${this.apiUrl}/unblock/${domain.domainName}`;
    console.log('DELETE URL:', url);
    return this.http.delete(url, {responseType: 'text'});
  }
}
