import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Product } from "src/models/product";
import { cartOperationModel } from "src/models/cartOperationModel";
import { ShoppingCartProduct } from "src/models/shoppingCartProduct";

const httpOptions = {
  headers: new HttpHeaders({'Content-type':'application/json'})
}

@Injectable()
export class ShoppingCartService{
  
  numberOfItemsInCart = new EventEmitter();

  constructor(private httpClient: HttpClient, private snackbarService: MatSnackBar){

  }

  getShoppingCartProducts(): Observable<ShoppingCartProduct[]> {
    const userId = JSON.parse(localStorage.getItem("loggedIn")!)
    return this.httpClient
      .get<ShoppingCartProduct[]>(
          "http://localhost:8080/api/shopping-cart?userId="+userId, httpOptions
      )
      .pipe(
          map((result: ShoppingCartProduct[]) => {
          return result;
          })
      )
  }
    

  addShoppingCartProduct(product: Product): Observable<Product>{
    const productId = product.id;
    const userId = JSON.parse(localStorage.getItem("loggedIn")!)
    return this.httpClient.post<any>("http://localhost:8080/api/shopping-cart/add", new cartOperationModel(userId,productId!) ).pipe(map(item => {
      
    return item;
    }))
  }

  removeShoppingCartProduct(product: Product): Observable<Product>{
    const productId = product.id;
    const userId = JSON.parse(localStorage.getItem("loggedIn")!)
    return this.httpClient.post<any>("http://localhost:8080/api/shopping-cart/remove", new cartOperationModel(userId,productId!)).pipe(map(item => {
      return item;
    }))
  }

  deleteShoppingCartProduct(product: Product): Observable<Product>{
    const productId = product.id;
    const userId = JSON.parse(localStorage.getItem("loggedIn")!)
    return this.httpClient.post<any>("http://localhost:8080/api/shopping-cart/delete", new cartOperationModel(userId,productId!)).pipe(map(item => {
      this.snackbarService.open('Успешно отстрането од кошничка','',{
        duration: 3000,
        panelClass: ['red-snackbar']
    });      
    return item;
    }))
  }

  getTotalCartQuantity() : Observable<number> {
    const userId = JSON.parse(localStorage.getItem("loggedIn")!)
    var totalProducts = 0;
    return this.getShoppingCartProducts().pipe(map(item => {
      for(let p of item){
        totalProducts = totalProducts + p.quantity;
      }
      return totalProducts;
    }))
  }
  
  getCartProductsPrice() : Observable<number> {
    const userId = JSON.parse(localStorage.getItem("loggedIn")!)
    var totalPrice = 0;
    return this.getShoppingCartProducts().pipe(map(item => {
      for(let p of item){
        totalPrice = totalPrice + p.product.price! * p.quantity;
      }
      return totalPrice;
    }))
  }

  isProductInShoppingCart(product: Product): Observable<boolean> {
    return this.getShoppingCartProducts().pipe(map(items => {
      return !!items.find(i => i.product.id == product.id)
    }))
}
}