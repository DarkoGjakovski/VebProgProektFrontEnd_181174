import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { Router } from '@angular/router';
import { faFilm, faHeartCircleMinus, faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/models/product';
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

  constructor(private productService: ProductService){
    
  }
  
  ngOnInit(): void {
    if(localStorage.getItem('cartItems')!=null){
      let cartProducts = JSON.parse(localStorage.getItem("cartItems") || "[]");
      for(let productItem of cartProducts){
        if(this.product?.id == productItem.product.id){
          this.isInCart.next(true)
          break;
        }
      }
    }
    if(localStorage.getItem('favorites')!=null){
      if(this.productService.isProductInFavories(this.product.id!)){
        this.isInFavorites.next(true)
      }
    }
  }

  navigateToUrl(){
  }

  addToCart(){
    console.log(this.product!.id!)
    this.productService.addProductToShoppingCart(this.product.id!)
    this.isInCart.next(true)
  }

  addorRemoveFromFavorites(){
    this.productService.addorRemoveProductToFavorites(this.product.id!)
    this.isInFavorites.next(!this.isInFavorites.value)
    this.productService.numberOfFavoriteItems.emit()
  }

  removeFromCart(){
    this.productService.forceRemoveItem(this.product.id!)
    this.isInCart.next(false)
  }

}

