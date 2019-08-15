1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ProgressService } from './progress.service';
 
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
 
     constructor(private progressService: ProgressService) { }
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        this.progressService.show();
 
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