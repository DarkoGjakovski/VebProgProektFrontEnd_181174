import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

const httpOptions = {
    headers: new HttpHeaders({'Content-type':'application/json'})
}
const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    // private currentUserSubject: BehaviorSubject<any> | undefined;
    // public currentUser: Observable<any> | undefined;
    // public isLoggedIn = false;

    private signupUrl = 'http://localhost:8080/registeruser'
    private loginUrl = 'http://localhost:8080/login'
    changeToolbarClass = new EventEmitter();

    constructor(private http: HttpClient, private router: Router, private snackbarService: MatSnackBar) {

    }

    login(user: User): void {
      this.http.post<any>(this.loginUrl, user).subscribe(
        data => {
          console.log("response received");
          localStorage.setItem("loggedIn",data.id);
          this.changeToolbarClass.emit()
          this.router.navigateByUrl('/home')
        },
        error => {
          console.log("error occured");
          this.snackbarService.open('Погрешен е-маил или лозинка','',{
                    duration: 3000,
                    panelClass: ['red-snackbar']
                });
        }
      )
    }
    
    signUp(user: User): void {
      this.http.post<any>(this.signupUrl, user).subscribe(
        data => {
          console.log("response received");
          this.snackbarService.open('Успешно се регистриравте','',{
            duration: 3000,
            panelClass: ['red-snackbar']
        });
          this.router.navigate(['/'])
        },
        error => {
          console.log("error occured");
          this.snackbarService.open('Веќе постои корисник со внесениот емаил','',{
                    duration: 3000,
                    panelClass: ['red-snackbar']
                });
        }
      )
    }

}