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
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {  

  public confirmForm: FormGroup;
  returnUrl: string;
  showProgress: boolean;

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

    this.confirmForm = new FormGroup({
      surname: new FormControl('', [Validators.required]),
      ippis: new FormControl('', [Validators.required])
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    
  }  

  public hasError = (controlName: string, errorName: string) => {
    return this.confirmForm.controls[controlName].hasError(errorName);
  }

  public confirm = (loginFormValue) => {
    if(this.confirmForm.valid) {
      this.executeLoginAction(loginFormValue);
    }
  }

  private executeLoginAction = (loginFormValue) => {
    //let loginValues: Login = {
      //var username =  loginFormValue.username;
      //var password =  loginFormValue.password + "&grant_type=password";
    //} 
    let id2 = loginFormValue.surname;
    let id = loginFormValue.ippis;
    
    this.repoService.GetLogin(id, id2, `api/User/GetFirstLogin`)
    .subscribe(res => {
      //this.router.navigate(['/home']);      
      
      console.log(res);
      //this.router.navigate([this.returnUrl]);
      this.router.navigate(['/home']);
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
