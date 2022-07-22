import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
// https://cdn.builder.codes/api/v1/proxy-api?url=https%3A%2F%2Fpersonal-fig%3Aklb655IIBPUJUCFNBVgRbRZUrim8oTzV%40api.swell.store%2Fproducts
export class ApiService {
  headers = new HttpHeaders()


    .append('Access-Control-Allow-Origin', '*');
  private myToast: any;
  constructor(private http: HttpClient, private toast: ToastController) { }
  get(url: any) {
    return this.http.get(url, { headers: this.headers })
  }
  post(url: any, data) {
    return this.http.post(url, data, { headers: this.headers })

  }



  showToast(message, color) {
    this.myToast = this.toast.create({
      message: message,
      duration: 5000,
      position: 'top',
      color: color,
      cssClass: 'creat-facility-toast',


    }).then((toastData) => {
      toastData.present();
    });
  }
  HideToast() {
    this.myToast = this.toast.dismiss();
  }


}
