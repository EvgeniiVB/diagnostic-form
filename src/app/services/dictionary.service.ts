import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private apiUrl = 'https://global.lakmus.org/Dictionaries/icpc2';

  constructor(private http: HttpClient) {
  }


  search(searchTerm?: string): Observable<{ name: string }[]> {
    let params;
    if (searchTerm) {
            params = new HttpParams()
        .set('IsPublic', 'true')
        .set('search', searchTerm);
    } else {

      params = new HttpParams()
        .set('IsPublic', 'true');
    }
    // @ts-ignore
    return this.http.get<{ name: string }[]>(this.apiUrl, {params});
  }
}
