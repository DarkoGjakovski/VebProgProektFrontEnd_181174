import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/models/product';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './product.list.component.html',
  styleUrls: ['./product.list.component.css']
})
export class ProductListComponent implements OnInit {

  products: BehaviorSubject<Product[]> = new BehaviorSubject([new Product]);
  bannerTitle: BehaviorSubject<string> = new BehaviorSubject("");
  numberOfPages: number = 1;
  pageNumber: number = 1;

  constructor(private productService: ProductService, private activeRoute: ActivatedRoute) { 
    this.activeRoute.queryParams.subscribe(newValue => {
      var editCasingTemp = newValue['c']
      editCasingTemp = editCasingTemp.substr(0,1).toUpperCase() + editCasingTemp.substr(1);
      this.bannerTitle.next(editCasingTemp)
      console.log(editCasingTemp)
    })
    this.products.subscribe(value => {
      if(value.length%8!==0){
        this.numberOfPages = (Math.floor(value.length/8))+1;
        console.log(Math.floor(value.length/8)+1)
      }else{
        this.numberOfPages = value.length/8;
        console.log(value.length/8)
      }
      console.log(this.numberOfPages)
    })
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
  }

}
