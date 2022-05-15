import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string | undefined;
  password: string | undefined;
  email: string | undefined;
  
  successMessage: string | undefined;
  registerSuccess = true;
  
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  handleSignUp() {
    this.authService.signUp(new User(0,this.email!,this.username!,this.password!))
  }
}
