import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
data:any;
  constructor(private api:ApiService) { }

  ngOnInit() {
  }
toGet(){
  this.api.get('').subscribe((res:any)=>{
    this.data=res;
  })
}
signForm=new FormGroup({
  userName:new FormControl(''),
  email:new FormControl(''),
  password:new FormControl(''),
  confirmPassword:new FormControl(''),
  rememberMe:new FormGroup(''),
})
signTo(){
  console.log(this.signForm.value);
}
}
