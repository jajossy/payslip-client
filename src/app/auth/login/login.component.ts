import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RepositoryService } from './../../repository.service';

import { MatTableDataSource, MatPaginator} from '@angular/material';
import { AuthenticationService } from '../../authentication.service';
import * as jwt_decode from 'jwt-decode';

import { Login } from '../login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  

  public loginForm: FormGroup;

  constructor(private repoService: RepositoryService,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(6)])
    });
    
  }  

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public login = (loginFormValue) => {
    if(this.loginForm.valid) {
      this.executeLoginAction(loginFormValue);
    }
  }

  private executeLoginAction = (loginFormValue) => {
    //let loginValues: Login = {
      //var username =  loginFormValue.username;
      //var password =  loginFormValue.password + "&grant_type=password";
    //} 
    let model = "username=" + loginFormValue.username + "&password=" + loginFormValue.password + "&grant_type=" + "password";
    this.authenticationService.login(model)
    .subscribe(res => {
      this.router.navigate(['/home']);
      //console.log(res);
      //var decode = jwt_decode(localStorage.getItem('suitrohUser'));
      //console.log(decode);
    },
    error => {
      console.log(error);
    })
  }

  /*public getAllCustomers = () => {
    this.repoService.getData('api/customer')
    .subscribe(res => {
      this.dataSource.data = res as Customer[];
      console.log(res);
    })
  }*/

  /*let apiUrl = 'api/owner';
    this.repository.create(apiUrl, owner)
      .subscribe(res => {
        //this is temporary, until we create our dialogs
        this.location.back();
      },
      (error => {
        //temporary as well
        this.location.back();
      })
    )
  }*/

  
}
