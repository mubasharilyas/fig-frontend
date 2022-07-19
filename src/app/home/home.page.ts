import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import swell from 'swell-js'
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  reviews: any[] = []
  averageProductReview = 0;
  userRating = 0;
  score;
  reviewForm: FormGroup
  selectedProduct: any;
  @ViewChild('myModalClose') modalClose: ElementRef;
  constructor(private api: ApiService) { }

  onChange(event) {
    this.score = event
    console.log("rating:", this.score)
  }
  ngOnInit(): void {
    this.reviewForm = new FormGroup({
      title: new FormControl('', Validators.required),
      review: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    })






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

    this.getTags()
  }
  getTags() {
    this.isLoading = true
    this.api.get('https://cdn.builder.codes/api/v1/proxy-api?url=https%3A%2F%2Fpersonal-fig%3Aklb655IIBPUJUCFNBVgRbRZUrim8oTzV%40api.swell.store%2Fcategories').subscribe((res: any) => {
      this.tags = res.results
      console.log("tages:", this.tags)
      this.isLoading = false

    })
  }
  getReviewsAfterPost() {
    const options = {
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
    };

    fetch('https://api.yotpo.com/v1/apps/9FitVj0ljhHaoWZOrnOsgwOUbBw3ccswkjDeivu2/reviews?utoken=' + localStorage.getItem('yotpo_token'), options)
      .then(response => response.json())
      .then(response => {
        debugger;
        this.reviews = response.reviews;
        this.individauls[0].reviews = this.reviews.filter(x => x.sku == this.individauls[0].id)
        this.individauls[0].slicedReviews = this.individauls[0].reviews.slice(0, 2)
        console.log("reviews:", this.individauls[0])
        this.individauls[0].averageProductReview = this.averageRatingCalculation(this.individauls[0].reviews)
      })
      .catch(err => console.error(err));
  }
  getReviews() {
    const options = {
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
    };
    fetch('https://api.yotpo.com/v1/apps/9FitVj0ljhHaoWZOrnOsgwOUbBw3ccswkjDeivu2/reviews?count=10000000000000&utoken=' + localStorage.getItem('yotpo_token'), options)
      .then(response => response.json())
      .then(response => {
        this.reviews = response.reviews
        console.log("ttttt:", response)
      })
      .catch(err => console.error(err));
  }



  createReview() {
    const options = {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        appkey: '9FitVj0ljhHaoWZOrnOsgwOUbBw3ccswkjDeivu2',
        domain: '',
        sku: this.selectedProduct.id,
        product_title: this.selectedProduct.name,
        product_description: '',
        product_url: '',
        product_image_url: '',
        display_name: this.reviewForm.value.name,
        email: this.reviewForm.value.email,
        is_incentivized: true,
        review_content: this.reviewForm.value.review,
        review_title: this.reviewForm.value.title,
        review_score: this.score
      })
    };
    console.log('formData:', this.reviewForm.value)

    fetch('https://api.yotpo.com/v1/widget/reviews', options)
      .then(response => response.json())
      .then(response => {
        this.api.showToast('Review created successfuly', 'success');

        console.log("Api response:", response)
      })
      .catch(err => {
        this.api.showToast('Something went wrong', 'danger');

      });

    this.reviewForm.reset()
    this.userRating = 0
    this.modalClose.nativeElement.click();

  }

  getProduct(product) {
    this.selectedProduct = product

    console.log("product id", this.selectedProduct)
  }


  // Initialize the client first

  async searchBytag(tag, from = 'slide') {
    // if (from == 'searchbox') {
    //   let category = this.tags.filter(x => x.name.toLowerCase().includes(tag.toLowerCase()))
    //   this.selectedCategory = category ? category : tag;
    //  console.log("category:",category)
    // }
    // else {
    this.selectedCategory = tag
    this.search = ''

    // }
    this.isLoading = true
    this.api.get('https://cdn.builder.codes/api/v1/proxy-api?url=https%3A%2F%2Fpersonal-fig%3Aklb655IIBPUJUCFNBVgRbRZUrim8oTzV%40api.swell.store%2Fproducts%3Fwhere%5Bactive%5D%3Dtrue%26category=' + this.selectedCategory).subscribe((res: any) => {
      this.individauls = res.results.map(ind => {
        ind.reviews = this.reviews.filter(x => x.sku == ind.id)
        ind.slicedReviews = ind.reviews.slice(0, 2)
        console.log("reviews:", ind.reviews)
        ind.averageProductReview = this.averageRatingCalculation(ind.reviews)
        ind.averageProductReview = ind.averageProductReview ? ind.averageProductReview : 0
        console.log("avgrege:", ind.averageProductReview)
        console.log(ind)
        // ind.bio = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries`;

        ind.isBioExpended = false;
        ind.isReviewExpended = false
        return ind;
      })
      this.isLoading = false

    })


  }
  averageRatingCalculation(review) {
    let avgRating = 0;
    let total = 0;
    if (review.length) {
      for (let i = 0; i < review.length; i++) {
        total = total + review[i].score
      }
      avgRating = total / review.length
      return avgRating
    }
    else {
      return avgRating
    }
  }

}
