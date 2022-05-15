import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { Product } from 'src/models/product';
import { FavoritesCartService } from 'src/services/favoritesCart.service';
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
  sub: Subscription = new Subscription()

  constructor(private productService: ProductService, private favoritesService: FavoritesCartService, private changedet: ChangeDetectorRef) {
    this.sub.add(
      this.productService.numberOfFavoriteItems.subscribe(value => {
        this.favoritesService.getFavoriteProducts().subscribe(result => {
          this.products.next(result)
        })
      })
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  ngOnInit(): void {
    this.favoritesService.getFavoriteProducts().subscribe(result => {
      this.products.next(result)
    })
  }

  changeInFav(){
    this.favoritesService.getFavoriteProducts().subscribe(result => {
      this.products.next(result)
      this.changedet.detectChanges()
    })
  }

}
