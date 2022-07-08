import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
url:any;
fileName;
filetype: any;
imageForm:FormGroup
signUpForm:FormGroup
isLoading: boolean;
tags: any;
  constructor(private api:ApiService) { }

  ngOnInit() {
 this.creatForm()
 this.getTags()

  }


  creatForm(){
    this.signUpForm=new FormGroup({
      name:new FormControl(''),
      catagary:new FormControl(''),
      bio:new FormControl(''),
    
    })
    this.imageForm=new FormGroup({
      image:new FormControl(''),
    })

  }


  getTags() {
    this.isLoading = true
    this.api.get('https://cdn.builder.codes/api/v1/proxy-api?url=https%3A%2F%2Fpersonal-fig%3Aklb655IIBPUJUCFNBVgRbRZUrim8oTzV%40api.swell.store%2Fcategories').subscribe((res: any) => {
      this.tags = res.results
      console.log("tages:", this.tags)
      this.isLoading = false

    })
  }

  SignUp(){
    console.log('singform:',this.signUpForm.value)
    console.log('singform:',this.imageForm.value)
    console.log('file name:',this.fileName)
    console.log('file name:',this.filetype)

  }
 


  onChangeFile(e:any){
    var reader = new FileReader();
     if(e.target.files&& e.target.files.length>0){
      let file=e.target.files[0]
      console.log('file:',file)
      reader.readAsDataURL(file);
      reader.onload= ()=>{
        this.url=reader.result;
        this.imageForm.get('image').setValue(this.url)
        this.fileName=file.name
        this.filetype=file.type
        console.log("url:",this.url)
        console.log('file name',this.fileName)
      
    }
    this.imageForm.get('image').setValue(this.url)
  }
  }









}