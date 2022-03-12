import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/models/product';
import { ShoppingCartService } from 'src/services/shoppingCart.service';

@Component({
  selector: 'app-productCard',
  templateUrl: './product.card.component.html',
  styleUrls: ['./product.card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class productCardComponent implements OnInit {

  @Input() product: Product | undefined;

  constructor(private router: Router, private shoppingCartService: ShoppingCartService){}
  
  ngOnInit(): void {
  }

  navigateToUrl(){
  }

  addToCart(){
    if(this.product!=undefined)
    this.shoppingCartService.addShoppingCartProduct(this.product)
  }

}
