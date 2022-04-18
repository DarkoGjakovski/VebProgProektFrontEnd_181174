import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductService } from 'src/services/product.service';
import { fadeAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit{
  title = 'anemona';
  numberOfItemsInCart = new BehaviorSubject<number>(0);

  constructor(private productService: ProductService, private changeDet: ChangeDetectorRef){
    if(localStorage.getItem("cartItems")==null)
      localStorage.setItem("cartItems",JSON.stringify([]))

    this.productService.numberOfItemsInCart.subscribe(newValue => {
      this.numberOfItemsInCart.next(newValue)
    })
  }

  ngOnInit(): void {
    if(localStorage.getItem("cartItems")!==null){
      let cartProducts = JSON.parse(localStorage.getItem("cartItems") || "[]");
      console.log("madjfnsidvbsuidv "+cartProducts.length)
      this.numberOfItemsInCart.next(cartProducts.length)
      this.changeDet.detectChanges()
    }
  }



}
