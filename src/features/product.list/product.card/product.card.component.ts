import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  EventEmitter,
  Output
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faFilm, faHeartCircleMinus, faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/models/product';
import { FavoritesCartService } from 'src/services/favoritesCart.service';
import { ProductService } from 'src/services/product.service';
import { ShoppingCartService } from 'src/services/shoppingCart.service';

@Component({
  selector: 'app-productCard',
  templateUrl: './product.card.component.html',
  styleUrls: ['./product.card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class productCardComponent implements OnInit {

  heartPlusIcon = faHeartCirclePlus;
  heartMinusIcon = faHeartCircleMinus;
  @Input() product!: Product;
  isInCart = new BehaviorSubject<boolean>(false);
  isInFavorites = new BehaviorSubject<boolean>(false);
  @Output() changeInFav = new EventEmitter<string>();

  constructor(private snackBar: MatSnackBar,
     private shoppingCartService: ShoppingCartService,
      private favoritesService: FavoritesCartService, 
      private changeDetection: ChangeDetectorRef,
      private productService: ProductService){
    
  }
  
  ngOnInit(): void {
    this.favoritesService.isProductInFavories(this.product).subscribe(result => {
      this.isInFavorites.next(result)
      this.changeDetection.detectChanges()
    })
    this.shoppingCartService.isProductInShoppingCart(this.product).subscribe(result => {
      this.isInCart.next(result)
      this.changeDetection.detectChanges()
    })
  }

  navigateToUrl(){
  }

  addToCart(){
    console.log(this.product!.id!)
    this.shoppingCartService.addShoppingCartProduct(this.product).subscribe(()=>{
      this.shoppingCartService.numberOfItemsInCart.emit()
    })
    this.snackBar.open('Успешно додадено во кошничка','',{
      duration: 3000,
      panelClass: ['red-snackbar']
  });  
    this.isInCart.next(true)
  }

  addorRemoveFromFavorites(){
    if(this.isInFavorites.value === false){
      this.favoritesService.addProductToFavoritesCart(this.product).subscribe(()=>{
        this.isInFavorites.next(true)
        console.log(this.isInFavorites.value)
        this.changeInFav.emit('')
        this.changeDetection.detectChanges()
      });
    }else{
      this.favoritesService.removeProductFromFavoritesCart(this.product).subscribe(()=>{
        this.isInFavorites.next(false);
        console.log(this.isInFavorites.value)   
        this.changeInFav.emit('')
        this.changeDetection.detectChanges()
      });
    }
  }

  removeFromCart(){
    this.shoppingCartService.deleteShoppingCartProduct(this.product).subscribe(()=>{
      this.shoppingCartService.numberOfItemsInCart.emit()
    })
    this.isInCart.next(false)
  }

  deleteProduct(){
    this.productService.deleteProduct(this.product).subscribe(()=>{
      this.productService.changeProducts.emit()
    })
  }

}

