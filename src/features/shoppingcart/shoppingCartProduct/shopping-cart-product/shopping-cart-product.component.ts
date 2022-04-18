import { Component, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/models/product';
import { ProductService } from 'src/services/product.service';
import { EventEmitter } from '@angular/core';

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

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  increaseQuantity(){
    this.productService.addProductToShoppingCart(this.product.id!);
    this.refreshItems.emit('')
    this.refreshTotalNumber.emit('')
  }

  deleteProduct(){
    this.productService.forceRemoveItem(this.product.id!)
    this.refreshItems.emit('')
    this.refreshTotalNumber.emit('')
  }

  decreaseQuantity(){
    this.productService.removeProductFromShoppingCart(this.product.id!);
    this.refreshItems.emit('')
    this.refreshTotalNumber.emit('')
  }

}
