import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductService } from 'src/services/product.service';
import { fadeAnimation } from './animations';
import { Location, PopStateEvent } from "@angular/common"
import { MatSidenavContent } from '@angular/material/sidenav';
import { AuthService } from 'src/services/auth.service';
import { ShoppingCartService } from 'src/services/shoppingCart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit, AfterViewInit{

  title = 'anemona';
  numberOfItemsInCart = new BehaviorSubject<number>(0);
  @ViewChild('nav', {static: false}) el !: MatSidenavContent;
  @ViewChild('toolbar',{static: false}) toolb !: ElementRef;
  loggedIn = new BehaviorSubject(false);

  constructor(private productService: ProductService,
     private changeDet: ChangeDetectorRef,
     private router: Router,
     private renderer: Renderer2,
     private authServ: AuthService,
     private shoppingCartService: ShoppingCartService
     ){
    if(localStorage.getItem("cartItems")==null)
      localStorage.setItem("cartItems",JSON.stringify([]))

    this.shoppingCartService.numberOfItemsInCart.subscribe(newValue => {
      this.shoppingCartService.getShoppingCartProducts().subscribe(items => {
        this.numberOfItemsInCart.next(items.length)
        this.changeDet.detectChanges()
      })
    })

  }
  ngAfterViewInit(): void {
    this.authServ.changeToolbarClass.subscribe(()=>{
      this.ChangeScreen();
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
    if(localStorage.getItem('loggedIn')){
      this.loggedIn.next(true)
    }
  }

  ChangeScreen() {
    this.renderer.addClass(this.toolb,"toolbar");
   }

  logout(){
    localStorage.clear()
    window.location.reload()
  }


  onToggleSidenav(){

  }


}
