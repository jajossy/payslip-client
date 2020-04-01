import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent {
  title = 'angular-material';  

  admin : boolean = false;
  upload : boolean = false;
  gifmis : boolean = false;
  ippis : boolean = false;  
  others : boolean = false;
  available : boolean = false;

  constructor(private authenticationService: AuthenticationService){
    if (this.authenticationService.currentUserValue.role == "admin"){
      this.admin = true;
      this.upload = true;
      this.gifmis = true;
      this.ippis = true;
      this.others = false;
      this.available = false;
      } 
      else{
        this.admin = false;
        this.gifmis = true;
        this.available = true;
        this.ippis = true;
        this.others = false;
      }
      
  }

 

  public onLogout = () => {
    this.authenticationService.logout();    
  }
}
