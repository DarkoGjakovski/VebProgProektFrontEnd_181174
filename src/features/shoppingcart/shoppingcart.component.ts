import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/models/product';
import { ShoppingCartProduct } from 'src/models/shoppingCartProduct';
import { ProductService } from 'src/services/product.service';
import { ShoppingCartService } from 'src/services/shoppingCart.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  // shoppingCartProducts: Product[] = []
  shoppingCartProducts = new BehaviorSubject<ShoppingCartProduct[]>([])
  totalProducts: number = 0;
  totalPrice: number = 0;
  delivery: number = 0;

  constructor(private productService: ProductService) { 

  }

  ngOnInit(): void {
    this.shoppingCartProducts.next(this.productService.getShoppingCartProduct());
    this.totalProducts = this.productService.getTotalCartQuantity()
    this.totalPrice = this.productService.getCartProductsPrice()

    console.log(this.shoppingCartProducts.value)
  }

  refreshItems(){
    this.shoppingCartProducts.next(this.productService.getShoppingCartProduct());
  }

  removeProduct(id: number){
    this.productService.removeProductFromShoppingCart(id)
    this.shoppingCartProducts.next(this.productService.getShoppingCartProduct());
  }

  changeDelivery(){
    if(this.delivery==0){
      this.delivery=100
      this.totalPrice = this.totalPrice+100
    }else{
      this.delivery=0
      this.totalPrice = this.totalPrice-100
    }
  }

  updateTotal(){
    this.totalProducts = this.productService.getTotalCartQuantity()
    this.totalPrice = this.productService.getCartProductsPrice()
  }
  
}
