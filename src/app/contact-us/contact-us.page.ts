import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
isloader:boolean=false;
  form = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl(''),
    
  });
  firstname: any;
  constructor(private api: ApiService) { }

  ngOnInit() {
  }
  sendrequest(value: any) {
    this.isloader=true
    console.log(value);
    this.api.mail(value).subscribe((data) => {
      this.api.showToast("Message sent successfully", 'success')
      this.isloader=false
    }, err => {

      this.api.showToast('Something went wrong', 'danger');

    }) 
  }
 

}
