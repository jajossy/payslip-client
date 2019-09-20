import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  title = 'angular-material';

    AddSupplier : boolean = false;
    Tag : boolean = false;
    NewStock : boolean = false;
    AddInventory : boolean = false;
    Inventory : boolean = false;

  constructor(private authenticationService: AuthenticationService){
    if (this.authenticationService.currentUserValue.role == "superadmin"){
      this.AddSupplier = true;
      this.Tag = true;
      this.NewStock = true;
      this.AddInventory = true;
      this.Inventory = true;
    } else if (this.authenticationService.currentUserValue.role == "admin"){
        this.AddSupplier = true;
        this.Tag = true;
        this.NewStock = true;
        this.AddInventory = true;
        this.Inventory = true;
      }
      else if(this.authenticationService.currentUserValue.role == "agent"){
        this.AddSupplier = false;
        this.Tag = false;
        this.NewStock = false;
        this.AddInventory = false;
        this.Inventory = false;
      }
      else if(this.authenticationService.currentUserValue.role == "account"){
        this.AddSupplier = false;
        this.Tag = false;
        this.NewStock = false;
        this.AddInventory = false;
        this.Inventory = false;
      }
      else if(this.authenticationService.currentUserValue.role == "operation"){
        this.AddSupplier = false;
        this.Tag = false;
        this.NewStock = false;
        this.AddInventory = false;
        this.Inventory = false;
      }
      else if(this.authenticationService.currentUserValue.role == "manager"){
        this.AddSupplier = true;
        this.Tag = true;
        this.NewStock = true;
        this.AddInventory = true;
        this.Inventory = true;
      }
      
  }
}
