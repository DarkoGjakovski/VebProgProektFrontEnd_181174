import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
  
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Promise<boolean> {
        var check = localStorage.getItem("loggedIn") || -1;
        if(check !== -1){
            check = JSON.parse(localStorage.getItem("loggedIn")!);
        }
        if (check == -1) {
            this.router.navigate(['/login']);
        }
        return true;
    }
}