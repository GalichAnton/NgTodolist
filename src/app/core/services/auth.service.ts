import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonResponse } from '@core/models/core.models';
import { environment } from '@env/environment';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string; password: string }) {
    this.http.post<CommonResponse>(`${environment.baseUrl}/auth/login`, data).subscribe(res => {
      if (res.resultCode === 0) {
        this.router.navigate(['/']);
      }
    });
  }

  logout() {
    this.http.delete<CommonResponse>(`${environment.baseUrl}/auth/login`).subscribe(res => {
      if (res.resultCode === 0) {
        this.router.navigate(['/login']);
      }
    });
  }

  me() {
    this.http.get(`${environment.baseUrl}/auth/me`).subscribe(res => console.log(res));
  }
}
