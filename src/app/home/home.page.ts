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
  reviews = []
  constructor(private api: ApiService) { }
  ngOnInit(): void {
    console.log(localStorage.getItem('yotpo_token'))
    if (!localStorage.getItem('yotpo_token')) {
      const options = {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: '9FitVj0ljhHaoWZOrnOsgwOUbBw3ccswkjDeivu2',
          client_secret: 'SaChxK7jS9KSXGhyWejR7XgDAEmtdaaaieRkI2Vn',
          grant_type: 'client_credentials'
        })
      };

      fetch('https://api.yotpo.com/oauth/token', options)
        .then(response => response.json())
        .then(response => {
          console.log(response)
          localStorage.setItem('yotpo_token', response.access_token);
          this.getReviews()
        }
        )
        .catch(err => console.error(err));
    } else {
      this.getReviews()
    }
    this.getTags()


  }
  getTags() {
    this.isLoading = true
    this.api.get('https://cdn.builder.codes/api/v1/proxy-api?url=https%3A%2F%2Fpersonal-fig%3Aklb655IIBPUJUCFNBVgRbRZUrim8oTzV%40api.swell.store%2Fcategories').subscribe((res: any) => {
      this.tags = res.results
      this.isLoading = false

    })
  }
  getReviews() {
    const options = {
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
    };

    fetch('https://api.yotpo.com/v1/apps/9FitVj0ljhHaoWZOrnOsgwOUbBw3ccswkjDeivu2/reviews?utoken=' + localStorage.getItem('yotpo_token'), options)
      .then(response => response.json())
      .then(response => {
        this.reviews = response.reviews
        console.log(response)
      })
      .catch(err => console.error(err));
  }
  createReview() {
    const options = {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        appkey: '9FitVj0ljhHaoWZOrnOsgwOUbBw3ccswkjDeivu2',
        domain: 'http://www.shop.com',
        sku: "622b87b88825770132e08b4f",
        product_title: 'Phone',
        product_description: 'Smart Phone',
        product_url: 'http://www.shop.com/phone.html',
        product_image_url: 'http://www.shop.com/phone.jpg',
        display_name: 'John Smith',
        email: 'john@shop.com',
        is_incentivized: true,
        review_content: 'It’s really good',
        review_title: 'Great Phone',
        review_score: 4
      })
    };

    fetch('https://api.yotpo.com/v1/widget/reviews', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
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
      this.individauls = res.results.map(ind => {
        ind.review = this.reviews.filter(x => x.sku == ind.id)
        
        console.log(ind)
        ind.bio = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries`;
        ind.reviews = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
         Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries`;
        ind.isBioExpended = false;
        ind.isReviewExpended = false
        return ind;
      })
      this.isLoading = false

    })


  }


}
