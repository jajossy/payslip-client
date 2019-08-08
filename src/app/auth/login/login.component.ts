import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RepositoryService } from './../../repository.service';

import { MatTableDataSource, MatPaginator} from '@angular/material';

import { Login } from '../login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  

  public loginForm: FormGroup;

  constructor(private repoService: RepositoryService) { }

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
    let loginValues: Login = {
      username: loginFormValue.username,
      password: loginFormValue.password
    } 
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
