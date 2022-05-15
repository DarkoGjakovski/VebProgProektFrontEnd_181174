import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Category } from "src/models/category";
import { Product } from "src/models/product";
import { ShoppingCartProduct } from "src/models/shoppingCartProduct";

@Injectable()
export class CategoryService{
    
    constructor(private snackBarService: MatSnackBar, private httpClient: HttpClient){

    }
    
    getCategories(): Observable<Category[]> {
        return this.httpClient
          .get<Product[]>(
              "http://localhost:8080/api/categories"
          )
          .pipe(
              map((result: Product[]) => {
              return result;
              })
          )
    }
}