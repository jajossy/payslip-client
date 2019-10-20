import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  title = 'angular-material';

  TakeOrder : boolean = false;
  ApproveOrder : boolean = false;
  RealStock : boolean = false;  
  CheckOut : boolean = false;

  constructor(private authenticationService: AuthenticationService){
    if (this.authenticationService.currentUserValue.role == "superadmin"){
      this.TakeOrder = true;
      this.ApproveOrder = true;
      this.RealStock = true;
      this.CheckOut = true;
      } 
      else if (this.authenticationService.currentUserValue.role == "admin"){
        this.TakeOrder = false;
        this.ApproveOrder = true;
        this.RealStock = true;
        this.CheckOut = true;
      }
      else if(this.authenticationService.currentUserValue.role == "agent"){
        this.TakeOrder = true;
        this.ApproveOrder = false;
        this.RealStock = false;
        this.CheckOut = false;
      }
      else if(this.authenticationService.currentUserValue.role == "account"){
        this.TakeOrder = false;
        this.ApproveOrder = true;
        this.RealStock = true;
        this.CheckOut = false;
      }
      else if(this.authenticationService.currentUserValue.role == "operation"){
        this.TakeOrder = false;
        this.ApproveOrder = false;
        this.RealStock = true;
        this.CheckOut = true;
      }
      else if(this.authenticationService.currentUserValue.role == "manager"){
        this.TakeOrder = false;
        this.ApproveOrder = false;
        this.RealStock = true;
        this.CheckOut = false;
      }
  }
}
