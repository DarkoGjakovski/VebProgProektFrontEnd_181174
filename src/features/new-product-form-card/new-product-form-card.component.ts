import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/models/category';
import { Product } from 'src/models/product';
import { CategoryService } from 'src/services/category.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-new-product-form-card',
  templateUrl: './new-product-form-card.component.html',
  styleUrls: ['./new-product-form-card.component.css']
})
export class NewProductFormCardComponent implements OnInit {

  nameProduct = new FormControl('',[Validators.required]);
  priceProduct = new FormControl('',[Validators.required]);
  imageProduct = new FormControl('',[Validators.required]);
  selectedCategories: Category[] = [];
  categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  

  constructor(private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(newCategories => {
      this.categories.next(newCategories);
    })
  }

  addProduct(){
    console.log(this.selectedCategories)
    this.productService.addProduct(new Product(0,this.nameProduct.value,this.priceProduct.value,this.imageProduct.value,'',this.selectedCategories)).subscribe(()=>{
      this.productService.changeProducts.emit()
    })
  }

  onChange(value: any) {
    console.log(value)
    this.selectedCategories = value;
  }

}
