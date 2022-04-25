import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { Product } from 'src/models/product';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  products: BehaviorSubject<Product[]> = new BehaviorSubject([new Product()]);
  bannerTitle: BehaviorSubject<string> = new BehaviorSubject("");
  numberOfPages: number = 1;
  pageNumber: number = 1;

  constructor(private productService: ProductService) {
    this.productService.numberOfFavoriteItems.subscribe(value => {
      this.products.next(this.productService.getFavoriteProducts());
    })
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe()
  }

  ngOnInit(): void {
    this.products.next(this.productService.getFavoriteProducts());
  }

}
