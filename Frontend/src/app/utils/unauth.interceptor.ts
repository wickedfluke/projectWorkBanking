import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { JwtService } from '../services/jwt.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UnauthInterceptor implements HttpInterceptor {

    constructor(private jwtSrv: JwtService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.jwtSrv.getToken();
        const authReq = authToken ? req.clone({
            headers: req.headers.set('Authorization', ` Bearer ${authToken}`)
        }) : req;

        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.jwtSrv.removeToken(); 
                    this.router.navigate(['/login']);
                }
                return throwError(() => error);
            })
        );
    }
}