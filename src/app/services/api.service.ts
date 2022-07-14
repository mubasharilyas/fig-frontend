import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// https://cdn.builder.codes/api/v1/proxy-api?url=https%3A%2F%2Fpersonal-fig%3Aklb655IIBPUJUCFNBVgRbRZUrim8oTzV%40api.swell.store%2Fproducts
export class ApiService {
  headers = new HttpHeaders()
  .append('Access-Control-Allow-Origin', '*');
  constructor(private http: HttpClient) { }
  get(url: any) {
    return this.http.get(url, { headers: this.headers })
  }
  post(url:any,data){
    return this.http.post(url,data, { headers: this.headers })

  }
}
