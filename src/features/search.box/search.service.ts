import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchBoxComponent } from "src/features/search.box/search.box.component";
import { Product } from "src/models/product";
import { ShoppingCartProduct } from "src/models/shoppingCartProduct";

@Injectable()
export class SearchService{

    search = new EventEmitter<string>();
    
    constructor(private snackBarService: MatSnackBar, private httpClient: HttpClient){
        
    }
    
    
}