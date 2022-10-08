import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'todo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  hide = true;

  loginForm = new FormGroup({
    email: new FormControl('inthesky133@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('18890412', [Validators.required, Validators.minLength(4)]),
    rememberMe: new FormControl(false),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.authService.login({ email: this.email?.value!, password: this.password?.value! });
  }
  ngOnInit(): void {}
}
