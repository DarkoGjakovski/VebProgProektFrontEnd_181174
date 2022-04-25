import { EventEmitter, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { Product } from "src/models/product";
import { ShoppingCartProduct } from "src/models/shoppingCartProduct";

@Injectable()
export class ProductService{

    numberOfItemsInCart = new BehaviorSubject<number>(0);
    numberOfFavoriteItems = new EventEmitter<string>();

    
    constructor(private snackBarService: MatSnackBar){

    }

    products: Product[] = [
        new Product(1,'assets/cactus.jpg','Кактус','Цвеќе со боцки в пустина',150),
        new Product(2,'assets/ficus.jpg','Фикус','Фикусче',200),
        new Product(3,'assets/flower.jpg','Бонбончиња','Како шо не ми донесе Стефан',300),
        new Product(4,'assets/hibiskus.jpg','Хибискус','Не знам шо е то',100),
        new Product(5,'assets/rose.jpg','Роза','Црвена',500),
        new Product(6,'assets/cactus.jpg','Кактус','Цвеќе со боцки в пустина',150),
        new Product(7,'assets/ficus.jpg','Фикус','Фикусче',200),
        new Product(8,'assets/flower.jpg','Бонбончиња','Како шо не ми донесе Стефан',300),
        new Product(9,'assets/hibiskus.jpg','Хибискус','Не знам шо е то',100),
        new Product(10,'assets/rose.jpg','Роза','Црвена',500),
        new Product(11,'assets/cactus.jpg','Кактус','Цвеќе со боцки в пустина',150),
        new Product(12,'assets/ficus.jpg','Фикус','Фикусче',200),
        new Product(13,'assets/flower.jpg','Бонбончиња','Како шо не ми донесе Стефан',300),
        new Product(14,'assets/hibiskus.jpg','Хибискус','Не знам шо е то',100),
        new Product(15,'assets/rose.jpg','Роза','Црвена',500)
      ]

      addProductToShoppingCart(id: number){
        let cartProducts = new Array();
        if(localStorage.getItem('cartItems')){
            cartProducts = JSON.parse(localStorage.getItem("cartItems") || "[]");
        }
        
        let newShoppingProduct = cartProducts.find(product => product.product.id === id);

        if(!!newShoppingProduct){
            cartProducts.find(product => product.product.id === id).quantity = newShoppingProduct.quantity+1;
        }else{
            cartProducts.push(new ShoppingCartProduct(this.products.find(product => product.id === id) as Product,1));
            this.snackBarService.open('Успешно го додадовте продуктот во кошничка','',{
                duration: 3000,
                panelClass: ['blue-snackbar']
            });
        }

        localStorage.setItem("cartItems",JSON.stringify(cartProducts))

        this.numberOfItemsInCart.next(cartProducts.length)
      }

      addorRemoveProductToFavorites(id: number){
        let favorites = new Array();
        if(localStorage.getItem('favorites')){
            favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        }

        let newfavoriteProduct = favorites.find(product => product.id === id);

        if(newfavoriteProduct){
            favorites = favorites.filter(product => product.id !== id)
            this.snackBarService.open('Успешно отстрането од омилени продукти','',{
                duration: 3000,
                panelClass: ['blue-snackbar']
            });
        }else{
            favorites.push(this.products.find(product => product.id === id));
            this.snackBarService.open('Успешно додадено во омилени продукти','',{
                duration: 3000,
                panelClass: ['blue-snackbar']
            });
        }

        localStorage.setItem("favorites",JSON.stringify(favorites))
      }

      forceRemoveItem(id: number){
        let cartProducts = new Array();
        if(localStorage.getItem('cartItems')){
            cartProducts = JSON.parse(localStorage.getItem("cartItems") || "[]");
        }

        cartProducts = cartProducts.filter(productItem => productItem.product.id !== id)
        this.snackBarService.open('Успешно го отстранивте продуктот од кошничка','',{
            duration: 3000,
            panelClass: ['blue-snackbar']
        });
        
        localStorage.setItem("cartItems",JSON.stringify(cartProducts))

        this.numberOfItemsInCart.next(cartProducts.length)
      }

      getShoppingCartProduct(){
        let cartProducts = new Array();
        if(localStorage.getItem('cartItems')){
            cartProducts = JSON.parse(localStorage.getItem("cartItems") || "[]");
        }

        return cartProducts;
      }

      getFavoriteProducts(){
        let favorites = new Array();
        if(localStorage.getItem('favorites')){
            favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        }

        return favorites;
      }

      isProductInFavories(id: number){
        let favorites = new Array();
        if(localStorage.getItem('favorites')){
            favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        }

        return favorites.find(product => product.id === id);
      }

      getTotalCartQuantity(){
        let cartProducts = new Array();
        if(localStorage.getItem('cartItems')){
            cartProducts = JSON.parse(localStorage.getItem("cartItems") || "[]");
        }
        let quantity = 0;

        cartProducts.forEach(p => {
            quantity += p.quantity
        })

        return quantity
      }

      removeProductFromShoppingCart(id: number){
        let cartProducts = new Array();
        if(localStorage.getItem('cartItems')){
            cartProducts = JSON.parse(localStorage.getItem("cartItems") || "[]");
        }

        let newShoppingProduct = cartProducts.find(product => product.product.id === id);

        if(!!newShoppingProduct && newShoppingProduct.quantity>1){
            cartProducts.find(product => product.product.id === id).quantity = newShoppingProduct.quantity-1;
        }else{ 
            cartProducts = cartProducts.filter(productItem => productItem.product.id !== id)
            this.snackBarService.open('Успешно го отстранивте продуктот од кошничка','',{
                duration: 3000,
                panelClass: ['blue-snackbar']
            });
        }
        
        localStorage.setItem("cartItems",JSON.stringify(cartProducts))

        this.numberOfItemsInCart.next(cartProducts.length)
      }

      getCartProductsPrice(){
        let cartProducts = new Array();
        if(localStorage.getItem('cartItems')){
            cartProducts = JSON.parse(localStorage.getItem("cartItems") || "[]");
        }
        let price = 0;

        cartProducts.forEach(p => {
            price += p.quantity * p.product.price
        })

        return price
      }
    
      getProducts(){
          return this.products.slice()
      }
}