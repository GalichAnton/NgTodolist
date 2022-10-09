import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { CommonResponse } from '@core/models/core.models';
import { environment } from '@env/environment';
import { BehaviorSubject, catchError, EMPTY, map, Observable, tap } from 'rxjs';

export interface LoginData {
  email: string;
  id: number;
  login: string;
}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private isAuth: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isAuth$ = this.isAuth.asObservable();

  login(data: { email: string; password: string }) {
    this.http
      .post<CommonResponse>(`${environment.baseUrl}/auth/login`, data)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
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

  me(): Observable<boolean | UrlTree> {
    return this.http.get<CommonResponse<LoginData>>(`${environment.baseUrl}/auth/me`).pipe(
      map(res => res.resultCode === 0),
      tap(isAuth => this.isAuth.next(isAuth)),
      map(isAuth => isAuth || this.router.createUrlTree(['/login']))
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    console.log(error.message);
    return EMPTY;
  }
}
