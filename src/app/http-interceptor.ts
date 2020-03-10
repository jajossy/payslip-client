import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ProgressService } from './progress.service';
import { AuthenticationService } from './authentication.service'
 
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
 
     constructor(private progressService: ProgressService,
                private authenticationService: AuthenticationService) { }
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        this.progressService.show();
        // here i have combined jwt with http interceptor
        if(localStorage.getItem('suitrohUser') != null)
        {
            // add authorization header with jwt token if available
            let currentUser = this.authenticationService.currentUserValue;
            if(currentUser && currentUser.token) {
                req = req.clone({
                    setHeaders: {
                        authorization: `Bearer ${currentUser.token}`
                    }
                });
            }
        }
 
        return next
            .handle(req)
            .pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        this.progressService.hide();
                    }
                }, (error) => {
                    this.progressService.hide();
                })
            );
    }
}