import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/models/product';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './product.list.component.html',
  styleUrls: ['./product.list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: BehaviorSubject<Product[]> = new BehaviorSubject([new Product()]);
  bannerTitle: BehaviorSubject<string> = new BehaviorSubject("");
  numberOfPages: number = 1;
  pageNumber: number = 1;
  sub: Subscription = new Subscription();

  constructor(private productService: ProductService, private activeRoute: ActivatedRoute) { 
    this.sub.add(
      this.activeRoute.queryParams.subscribe(newValue => {
        var editCasingTemp = newValue['c']
        editCasingTemp = editCasingTemp.substr(0,1).toUpperCase() + editCasingTemp.substr(1);
        this.bannerTitle.next(editCasingTemp)
      })
    )
    this.sub.add(
      this.products.subscribe(value => {
        if(value.length%8!==0){
          this.numberOfPages = (Math.floor(value.length/8))+1;
        }else{
          this.numberOfPages = value.length/8;
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  slicedList(): Observable<Product[]> {
    console.log(this.products.value.slice((this.pageNumber-1)*8,(this.pageNumber)*8))
    return of(this.products.value.slice((this.pageNumber-1)*8,(this.pageNumber)*8))
  }

  counter(i: number) {
    return new Array(i);
  }

  changePage(page: number){
    this.pageNumber = page;
    console.log(this.pageNumber)
  }

  ngOnInit(): void {
    this.products.next(this.productService.getProducts());
    window.scrollTo(0, 0);
  }

}
