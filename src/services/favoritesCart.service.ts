import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Product } from "src/models/product";
import { cartOperationModel } from "src/models/cartOperationModel";
import { ShoppingCartProduct } from "src/models/shoppingCartProduct";

const httpOptions = {
  headers: new HttpHeaders({'Content-type':'application/json'})
}

@Injectable()
export class FavoritesCartService{

  constructor(private httpClient: HttpClient, private snackbarService: MatSnackBar){

  }

  getFavoriteProducts(): Observable<Product[]> {
    const userId = JSON.parse(localStorage.getItem("loggedIn")!)
    return this.httpClient
      .get<Product[]>(
          "http://localhost:8080/api/favorites?userId="+userId, httpOptions
      )
      .pipe(
          map((result: Product[]) => {
          return result;
          })
      )
  }
    

  addProductToFavoritesCart(product: Product): Observable<Product>{
    const productId = product.id;
    const userId = JSON.parse(localStorage.getItem("loggedIn")!)
    return this.httpClient.post<any>("http://localhost:8080/api/favorites/add", new cartOperationModel(userId, productId!)).pipe(map(item => {
      this.snackbarService.open('Успешно додадено во омилени','',{
        duration: 3000,
        panelClass: ['red-snackbar']
    });
      return item;
    }))
  }

  removeProductFromFavoritesCart(product: Product): Observable<Product>{
    const productId = product.id;
    const userId = JSON.parse(localStorage.getItem("loggedIn")!)
    return this.httpClient.post<any>("http://localhost:8080/api/favorites/remove", new cartOperationModel(userId, productId!)).pipe(map(item => {
      this.snackbarService.open('Успешно отстрането од омилени','',{
        duration: 3000,
        panelClass: ['red-snackbar']
    });
      return item;
    }))
  }

  isProductInFavories(product: Product): Observable<boolean> {
      return this.getFavoriteProducts().pipe(map(items => {
         console.log(items)
         return !!items.find(i => i.id == product.id)
      }))
  }
}