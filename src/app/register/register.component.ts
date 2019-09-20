import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-regsiter',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  title = 'angular-material';

  AddAgent : boolean = false;
  AddCustomer : boolean = false;
  AddUser : boolean = false;

  constructor(private authenticationService: AuthenticationService){
    if (this.authenticationService.currentUserValue.role == "superadmin"){
      this.AddAgent = true;
      this.AddCustomer = true;
      this.AddUser = true;
      } 
      else if (this.authenticationService.currentUserValue.role == "admin"){
        this.AddAgent = true;
        this.AddCustomer = true;
        this.AddUser = true;
      }
      else if(this.authenticationService.currentUserValue.role == "agent"){
        this.AddAgent = false;
        this.AddCustomer = false;
        this.AddUser = true;
      }
      else if(this.authenticationService.currentUserValue.role == "account"){
        this.AddAgent = false;
        this.AddCustomer = false;
        this.AddUser = true;
      }
      else if(this.authenticationService.currentUserValue.role == "operation"){
        this.AddAgent = false;
        this.AddCustomer = false;
        this.AddUser = true;
      }
      else if(this.authenticationService.currentUserValue.role == "manager"){
        this.AddAgent = true;
        this.AddCustomer = false;
        this.AddUser = true;
      }
  }
  
}
