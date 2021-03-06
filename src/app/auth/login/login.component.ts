import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../../repository.service';
import { ProgressService } from './../../progress.service';

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
  returnUrl: string;
  showProgress: boolean;

  userStatus : Status[] = [
    { 'id' : 'user', 'value': 'Staff'},
    { 'id' : 'admin', 'value': 'Site Admin'}    
  ]

  constructor(private repoService: RepositoryService,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private progressService: ProgressService,
              private router: Router) { 
                // redirect to home if already logged in
                  if (this.authenticationService.currentUserValue) { 
                    this.router.navigate(['/home']);
                }
              }

  ngOnInit() {
    
    /*if(localStorage.getItem('suitrohUser') != null)
    {      
      window.location.reload();
    }*/

    /*this.loginForm = new FormGroup({
      surname: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      ippis: new FormControl('', [Validators.required, Validators.maxLength(8)])
    });*/

    this.loginForm = new FormGroup({
      status: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      ippis: new FormControl('', [Validators.required])
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    
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
    let model = "username=" + loginFormValue.surname + "&password=" + loginFormValue.ippis + "&status=" + loginFormValue.status + "&grant_type=" + "password";
    console.log(model);
    this.authenticationService.login(model)
    .subscribe(res => {
      //this.router.navigate(['/home']);      
      
      console.log(res);
      //this.router.navigate([this.returnUrl]);
      this.router.navigate(['/payslip/payslip/ippis']);
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

export interface Status {
  id: string;
  value: string;
}
