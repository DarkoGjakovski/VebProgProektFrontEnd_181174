import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product';
import { ShoppingCartService } from 'src/services/shoppingCart.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  shoppingCartProducts: Product[] = []
  selected: number = 1;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartProducts = this.shoppingCartService.getShoppingCartProducts();
  }

  removeProduct(id: number){
    this.shoppingCartService.removeShoppingCartProduct(id)
    this.shoppingCartProducts = this.shoppingCartService.getShoppingCartProducts();
  }

}
