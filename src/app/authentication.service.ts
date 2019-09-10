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
        if(localStorage.getItem('suitrohUser') != null)
        {
        //this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('suitrohUser')));
        var decode = jwt_decode(localStorage.getItem('suitrohUser'));
        this.currentUserSubject = new BehaviorSubject<User>(decode);
        this.currentUser = this.currentUserSubject.asObservable();
        }
    }

    public get currentUserValue(): User {
        if(localStorage.getItem('suitrohUser') != null)
        {
        return this.currentUserSubject.value;
        }
        return ;
    }

    //login(username: string, password: string){
    login(formValue){
        //return this.http.post<any>(`${environment.urlAddress}/token`, { username, password})
        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
        return this.http.post<any>(`${environment.urlAddress}/token`, formValue, { headers : reqHeader})
        .pipe(map(user => {
            //console.log(user);            
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('suitrohUser', JSON.stringify(user)); 
            var decode = jwt_decode(localStorage.getItem('suitrohUser'));
            this.currentUserSubject = new BehaviorSubject<User>(decode);
            this.currentUser = this.currentUserSubject.asObservable();          
            this.currentUserSubject.next(user);
            return user;
        }));
    }

    logout(){
        //remove user from local storage to log user out
        localStorage.removeItem('suitrohUser');
        this.router.navigate(['/auth/login']);
        //this.currentUserSubject.next(null);
    }
}