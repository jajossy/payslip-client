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
  gifmis : boolean = false;
  ippis : boolean = false;  
  others : boolean = false;

  constructor(private authenticationService: AuthenticationService){
    if (this.authenticationService.currentUserValue.role == "admin"){
      this.admin = true;
      this.gifmis = true;
      this.ippis = true;
      this.others = false;
      } 
      else{
        this.admin = false;
        this.gifmis = true;
        this.ippis = false;
        this.others = false;
      }
      
  }

  public onLogout = () => {
    this.authenticationService.logout();    
  }
}
