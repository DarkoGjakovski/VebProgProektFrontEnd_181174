import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { SearchBoxComponent } from 'src/features/search.box/search.box.component';
import { ProductListComponent } from 'src/features/product.list/product.list.component';
import { HomePageComponent } from 'src/features/home.page/home.page.component';
import { FilterCardComponent } from 'src/features/product.list/filter.card/filter.card.component';
import {MatSliderModule} from '@angular/material/slider';
import { productCardComponent } from 'src/features/product.list/product.card/product.card.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from 'src/features/footer/footer.component';
import { ShoppingcartComponent } from 'src/features/shoppingcart/shoppingcart.component';
import {MatSelectModule} from '@angular/material/select';
import { ProductService } from 'src/services/product.service';
import { ShoppingCartService } from 'src/services/shoppingCart.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    ProductListComponent,
    HomePageComponent,
    FilterCardComponent,
    productCardComponent,
    FooterComponent,
    ShoppingcartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDividerModule,
    MatIconModule,
    MatSliderModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [ProductService, ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
