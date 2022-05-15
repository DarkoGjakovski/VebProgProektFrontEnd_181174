import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from 'src/features/favorites/favorites.component';
import { HomePageComponent } from 'src/features/home.page/home.page.component';
import { LoginComponent } from 'src/features/login/login.component';
import { ProductListComponent } from 'src/features/product.list/product.list.component';
import { RegisterComponent } from 'src/features/register/register.component';
import { ShoppingcartComponent } from 'src/features/shoppingcart/shoppingcart.component';
import { AuthGuard } from 'src/guards/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home', canActivate: [AuthGuard], component: HomePageComponent
  },
  {
    path: 'products', canActivate: [AuthGuard], component: ProductListComponent
  },
  {
    path: 'shoppingcart', canActivate: [AuthGuard], component: ShoppingcartComponent
  },
  {
    path: 'favorites', canActivate: [AuthGuard], component: FavoritesComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
