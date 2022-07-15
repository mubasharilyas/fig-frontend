import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers = new HttpHeaders()
  
    
    .append('Access-Control-Allow-Origin', '*');
    private myToast: any;
  constructor(private http: HttpClient, private toast: ToastController) { }
  get(url: any) {
    return this.http.get(url, { headers: this.headers })
  }
  post(url:any,data){
    return this.http.post(url,data, { headers: this.headers })

  }



  showToast() {
    this.myToast = this.toast.create({
      message: 'Ionic Auto Hide Toast on Bottom',
      duration: 5000,
      position:'top',
      color:'success',
      cssClass:'creat-facility-toast',
      
      
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }
  HideToast() {
    this.myToast = this.toast.dismiss();
  }


}
