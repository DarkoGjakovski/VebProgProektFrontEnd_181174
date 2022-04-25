import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductService } from 'src/services/product.service';
import { fadeAnimation } from './animations';
import { Location, PopStateEvent } from "@angular/common"
import { MatSidenavContent } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit{
  title = 'anemona';
  numberOfItemsInCart = new BehaviorSubject<number>(0);
  private lastPoppedUrl: string = '';
  private yScrollStack: number[] = [];
  @ViewChild('nav', {static: false}) el !: MatSidenavContent;

  constructor(private productService: ProductService,
     private changeDet: ChangeDetectorRef,
     private router: Router,
     private location: Location
     ){
    if(localStorage.getItem("cartItems")==null)
      localStorage.setItem("cartItems",JSON.stringify([]))

    this.productService.numberOfItemsInCart.subscribe(newValue => {
      this.numberOfItemsInCart.next(newValue)
    })

  }

  onActivate(e: any) {
    if(this.el && this.el.getElementRef().nativeElement) {
      setTimeout(()=>{
        this.el.getElementRef().nativeElement.scrollTop = 0;
      },300)
      
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem("cartItems")!==null){
      let cartProducts = JSON.parse(localStorage.getItem("cartItems") || "[]");
      this.numberOfItemsInCart.next(cartProducts.length)
      this.changeDet.detectChanges()
    }
  }


  onToggleSidenav(){

  }

}
