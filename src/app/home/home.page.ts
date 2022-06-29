import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import swell from 'swell-js'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  search: String = '';
  selectedCategory = ''
  isLoading = false;
  tags = [];
  individauls = []
  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.getTags()
  }
  getTags() {
    this.api.get('https://cdn.builder.codes/api/v1/proxy-api?url=https%3A%2F%2Fpersonal-fig%3Aklb655IIBPUJUCFNBVgRbRZUrim8oTzV%40api.swell.store%2Fcategories').subscribe((res: any) => {
      this.tags = res.results
    })
  }

  // Initialize the client first

  async searchBytag(tag, from = 'slide') {
    if (from == 'searchbox') {
      let category = this.tags.filter(x => x.name.includes(tag))[0]
      this.selectedCategory = category ? category.name : tag;

    }
    else {
      this.selectedCategory = tag
      this.search = ''

    }
    this.isLoading = true
    this.api.get('https://cdn.builder.codes/api/v1/proxy-api?url=https%3A%2F%2Fpersonal-fig%3Aklb655IIBPUJUCFNBVgRbRZUrim8oTzV%40api.swell.store%2Fproducts?category=' + this.selectedCategory).subscribe((res: any) => {
      this.individauls = res.results
      this.isLoading = false

    })


  }


}
