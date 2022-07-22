import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
// https://cdn.builder.codes/api/v1/proxy-api?url=https%3A%2F%2Fpersonal-fig%3Aklb655IIBPUJUCFNBVgRbRZUrim8oTzV%40api.swell.store%2Fproducts
export class ApiService {
  headers = new HttpHeaders()
    .append('Content-Type', 'application/json').
    append("Authorization", "Basic " + btoa("ed0d1f74efcd976b2981996bf8f47e08:e8e95514cce4a03445bc022edf5a364f"))
    .append('Access-Control-Allow-Origin', '*');
  private myToast: any;
  constructor(private http: HttpClient, private toast: ToastController) { }
  mailurl = "https://cdn.builder.codes/api/v1/proxy-api?url=https%3A%2F%2Fapi.mailjet.com%2Fv3.1%2Fsend"

  get(url: any) {
    return this.http.get(url, { headers: this.headers })
  }
  post(url: any, data) {
    return this.http.post(url, data, { headers: this.headers })

  }
  mail(value: any) {
    return this.http.post(this.mailurl, {

      "SandboxMode": false,
      "Messages": [
        {
          "From": {
            "Email": value.email,
            "Name": value.firstname
          },
          "Sender": {
            "Email": value.email,
            "Name": value.firstname
          },
          "To": [
            {
              "Email": "mubasharbhatti485@gmail.com",
              "Name": "Afsar"
            }
          ],


          "ReplyTo": {
            "Email": "copilot@mailjet.com",
            "Name": "Your Mailjet Co-pilot"
          },
          "Subject": "For testing",
          "TextPart": "test",
          "HTMLPart": value.message,
        }
      ]

    }, { headers: this.headers })
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
