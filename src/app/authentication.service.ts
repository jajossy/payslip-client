import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

import { environment } from '../environments/environment';
import { User } from './interface/user';

@Injectable({ providedIn: 'root'})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private router: Router) {
        
        var token = localStorage.getItem('suitrohUser')
        if(token != null)
        {
            var decode = jwt_decode(token);
            this.currentUserSubject = new BehaviorSubject<User>(decode);
            this.currentUser = this.currentUserSubject.asObservable();
            console.log(this.currentUserSubject);
            console.log(this.currentUser);
        }
        else{
            this.currentUserSubject = new BehaviorSubject<User>(null);
            this.currentUser = this.currentUserSubject.asObservable();
        }
        
        
    }

    public get currentUserValue(): User {        
        return this.currentUserSubject.value;
    }

    //login(username: string, password: string){
    login(formValue){
        //return this.http.post<any>(`${environment.urlAddress}/token`, { username, password})
        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
        return this.http.post<any>(`${environment.urlAddress}/token`, formValue, { headers : reqHeader})
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
           
            // login successful if there's a jwt token in the response
            if (user.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                
                localStorage.setItem('suitrohUser', user.access_token);
                console.log(localStorage.getItem('suitrohUser'));                
                var decode = jwt_decode(user.access_token);
                this.currentUserSubject = new BehaviorSubject<User>(decode);
                console.log(this.currentUserSubject);        
                this.currentUserSubject.next(decode);
            }
            return decode;
        }));
    }

    logout(){
        //remove user from local storage to log user out
        localStorage.removeItem('suitrohUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);        
    }
}