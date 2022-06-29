import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers = new HttpHeaders()
    
    .append('Access-Control-Allow-Origin', '*');
  constructor(private http: HttpClient) { }
  get(url: any) {
    return this.http.get(url, { headers: this.headers })
  }
}
