import { Component, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/models/product';
import { ProductService } from 'src/services/product.service';
import { EventEmitter } from '@angular/core';
import { ShoppingCartService } from 'src/services/shoppingCart.service';

@Component({
  selector: 'app-shopping-cart-product',
  templateUrl: './shopping-cart-product.component.html',
  styleUrls: ['./shopping-cart-product.component.css']
})
export class ShoppingCartProductComponent implements OnInit {

  @Input() product!: Product;
  @Input() quantity!: number;
  @Output() refreshItems = new EventEmitter();
  @Output() refreshTotalNumber = new EventEmitter();

  constructor(private productService: ProductService, private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  increaseQuantity(){
    this.shoppingCartService.addShoppingCartProduct(this.product).subscribe(() => {
    this.refreshItems.emit('')
    this.refreshTotalNumber.emit('')
    })
  }

  deleteProduct(){
    this.shoppingCartService.deleteShoppingCartProduct(this.product).subscribe(() => {
      this.refreshItems.emit('')
      this.refreshTotalNumber.emit('')
    })
  }

  decreaseQuantity(){
    this.shoppingCartService.removeShoppingCartProduct(this.product).subscribe(() => {
    this.refreshItems.emit('')
    this.refreshTotalNumber.emit('')
    })
  }

}
