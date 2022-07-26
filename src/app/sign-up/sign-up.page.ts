import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  url: any = 'https://cdn.pixabay.com/photo/2016/04/22/04/57/graduation-1345143__340.png';
  fileName;
  filetype: any;
  imageForm: FormGroup
  signUpForm: FormGroup
  isLoading: boolean;
  tags: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.creatForm()
    this.getTags()

  }


  creatForm() {
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('',[Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      catagary: new FormControl('', Validators.required),
      bio: new FormControl('', Validators.required),

    })
    this.imageForm = new FormGroup({
      image: new FormControl(''),
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

  SignUp() {
    this.isLoading = true

    console.log('singform:', this.signUpForm.value)
    console.log('imageform:', this.imageForm.value)
    console.log('file name:', this.fileName)
    console.log('file name:', this.filetype)
    let data = {
      "name": this.signUpForm.controls.name.value,
      "category_id": this.signUpForm.controls.catagary.value,
      "active": false,
      "description": this.signUpForm.controls.bio.value,
      "email":this.signUpForm.controls.email.value,
      "phone_no":this.signUpForm.controls.phone.value,
      "images": [
        {
          "file": {
            "content_type": this.filetype,
            "filename": this.fileName,
            "data": this.url.substr(this.url.indexOf(',') + 1)
          }
        }
      ]
    }

    this.api.post('https://cdn.builder.codes/api/v1/proxy-api?url=https%3A%2F%2Fpersonal-fig%3Aklb655IIBPUJUCFNBVgRbRZUrim8oTzV%40api.swell.store%2Fproducts', data).subscribe(res => {
      console.log(res)
      this.api.showToast('Submission completed, we will notify you once approved', 'success');
      this.isLoading = false

    }, err => {
     // this.isLoading = false

      this.api.showToast('Something went wrong', 'danger');

    })

  }




  onChangeFile(e: any) {
    var reader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      let file = e.target.files[0]
      console.log('file:', file)
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.url = reader.result;
        this.fileName = file.name
        this.filetype = file.type
        console.log("url:", this.url)
        console.log('file name', this.fileName)

      }
    }
  }

  // showMyToast() {
  //   this.api.showToast();
  // }
  // hideMyToast() {
  //   this.api.HideToast();
  // }


}






