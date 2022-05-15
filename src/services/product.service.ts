import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchBoxComponent } from "src/features/search.box/search.box.component";
import { Product } from "src/models/product";
import { ShoppingCartProduct } from "src/models/shoppingCartProduct";

@Injectable()
export class ProductService{

    numberOfFavoriteItems = new EventEmitter<string>();
    sortChange = new EventEmitter<string>();
    search = new EventEmitter<Product[]>();
    filter = new EventEmitter<Product[]>();
    changeProducts = new EventEmitter();
    
    constructor(private snackBarService: MatSnackBar, private httpClient: HttpClient){
    }
    
    getProducts(category: string): Observable<Product[]> {
        console.log(category)
        return this.httpClient
          .get<Product[]>(
              "http://localhost:8080/api/products/all?c="+category
          )
          .pipe(
              map((result: Product[]) => {
                  console.log(result)
              return result;
              })
          )
    }

    searchProducts(query: string): Observable<Product[]> {
        console.log("query:"+query)
        return this.httpClient
          .get<Product[]>(
              "http://localhost:8080/api/products/search?q="+query
          )
          .pipe(
              map((result: Product[]) => {
                  console.log(result)
              return result;
              })
          )
    }

    filterProducts(occasion: String, color: String): Observable<Product[]> {
        return this.httpClient
          .get<Product[]>(
              "http://localhost:8080/api/products/filter?o="+occasion+"&co="+color
          )
          .pipe(
              map((result: Product[]) => {
                  console.log(result)
              return result;
              })
          )
    }

    addProduct(product: Product): Observable<Product>{
        return this.httpClient.post<any>("http://localhost:8080/api/products/add", product ).pipe(map(item => {
            this.snackBarService.open('Успешно додадовте продукт','',{
                duration: 3000,
                panelClass: ['red-snackbar']
            });
          return item;
        }))
    }

    deleteProduct(product: Product): Observable<any>{
        return this.httpClient.delete<any>("http://localhost:8080/api/products/delete/"+product.id).pipe(map(item => {
            this.snackBarService.open('Успешно го избришавте продуктот','',{
                duration: 3000,
                panelClass: ['red-snackbar']
            });
          return item;
        }))
    }
}