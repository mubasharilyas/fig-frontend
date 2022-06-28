import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  search: String = ''
  tags = [];
  individauls = []
  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.getTags()
  }
  getTags() {
    this.api.get('https://personal-fig:klb655IIBPUJUCFNBVgRbRZUrim8oTzV@api.swell.store/categories').subscribe((res: any) => {
      this.tags = res.results
    })
  }
  searchBytag() {
    this.api.get('https://personal-fig:klb655IIBPUJUCFNBVgRbRZUrim8oTzV@api.swell.store/products?category=' + this.search).subscribe((res: any) => {
      this.individauls = res.results
    })

  }


}
