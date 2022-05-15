import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string | undefined;
  password: string | undefined;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  handleLogin() {
      this.authService.login(new User(0,this.email!,'',this.password!));
  }

}
