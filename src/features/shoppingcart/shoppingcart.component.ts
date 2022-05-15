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

  constructor(private productService: ProductService, private shoppingCartService: ShoppingCartService) { 

  }

  ngOnInit(): void {
    this.shoppingCartService.getShoppingCartProducts().subscribe(result => {
      console.log(result)
      this.shoppingCartProducts.next(result)
    })
    this.shoppingCartService.getTotalCartQuantity().subscribe(newNumber => {
      this.totalProducts = newNumber;
    })
    this.shoppingCartService.getCartProductsPrice().subscribe(newPrice => {
      this.totalPrice = newPrice;
    })

    console.log(this.shoppingCartProducts.value)
  }

  refreshItems(){
    console.log("items")
    this.shoppingCartService.getShoppingCartProducts().subscribe(result => {
    console.log(result)
    this.shoppingCartProducts.next(result)
    })
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
    this.shoppingCartService.getTotalCartQuantity().subscribe(newNumber => {
      this.totalProducts = newNumber;
      console.log("total")
    })
    this.shoppingCartService.getCartProductsPrice().subscribe(newPrice => {
      this.totalPrice = newPrice;
      console.log("total")
    })
  }
  
}
