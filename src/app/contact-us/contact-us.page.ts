import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  form = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    message:new FormControl(''),
  });
  constructor(private api:ApiService) { }

  ngOnInit() {
  }
  sendrequest(value:any)
  {
    console.log(value);
    this.api.mail(value).subscribe((data)=>{
      console.log("response value"+data);
    })

    
    
  }

}
