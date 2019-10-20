import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../interface/country';
import { State } from '../../interface/state';
import { Customer } from '../../interface/customer';
import { RepositoryService } from './../../repository.service';
import { MatTableDataSource, MatPaginator, MatDialog} from '@angular/material';
import { Gender } from '../../interface/gender';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ProgressService } from './../../progress.service';
import { AuthenticationService } from '../../authentication.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  showProgress: boolean;
  selected : number;
  customerSaveButton : boolean = true;
  customerUpdateButton : boolean = false;
  resetButton: boolean  = true;

  // form varaibles
  public customerForm: FormGroup;
  countries: Country[];
  states: State[];
  CountryId : number;
  StateId : number;
  gender: Gender;
  GenderId: string;

  customerAgentUpdate : Customer;

  // table variables
  allCustomer: Customer[];
  public array: any;
  public displayedColumns = ['Storename', 'Zone', 'MarketPlace', 'Surname', 'Firstname',
                              'PhoneNo', 'update'];
                              

  public dataSource = new MatTableDataSource<Customer>();

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 

  constructor(private repoService: RepositoryService, private dialog: MatDialog,
              private progressService: ProgressService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.initializeForm();
    this.getCountry();
    this.getCustomer();
    this.getGender();
  }

  initializeForm(){
    this.customerForm = new FormGroup({      
      Storename: new FormControl('', [Validators.required]),
      Zone: new FormControl('', [Validators.required]),
      MarketPlace: new FormControl(''),
      Surname: new FormControl(''),
      Firstname: new FormControl(''),
      Othernames: new FormControl(''),
      GenderId: new FormControl(''),
      PhoneNo: new FormControl(''),
      CustomerEmail: new FormControl(''),
      Remark: new FormControl(''),    
      CountryId: new FormControl(''),
      StateId: new FormControl(''),
      CreatedUser: new FormControl('')
    });   
        
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.customerForm.controls[controlName].hasError(errorName);
  }

  getCountry(){
    this.repoService.GetAll("api/country/Get")
    .subscribe(country => {
      this.countries = country;            
      console.log(country)
    });
  }

  getState(id: number){
    if(id != null){
      this.repoService.GetAll(`api/State/Get/${id}`)
      .subscribe(state => {
        this.states = state;            
        console.log(state)
      });
    }
  }

  getGender(){
    this.repoService.GetAll("api/Gender/Get")
    .subscribe(gender => {
      this.gender = gender;            
      console.log(gender)
    });
  }

  fillState(CountryId){
    //alert(CountryId);
    this.getState(CountryId);
  }

  public addCustomer(customerFormValue){
    console.log(customerFormValue);
    if(this.customerForm.valid){
      this.customerSaveButton = false;
      customerFormValue.CreatedUser = this.authenticationService.currentUserValue.UserId;
      this.repoService.POST(customerFormValue, `api/Customer/Post`)
      .subscribe(res => {                 
        console.log(res)
        let dialogRef = this.dialog.open(SuccessDialogComponent, {
          width: '250px',
          disableClose: true,
          data: {message: "Customer Added Successfully"}
        });
        this.initializeForm();           
        this.customerSaveButton = true; 
        this.getCustomer();                
        console.log(res)
      });
    }    
  }

  public reset() : void{
    this.customerSaveButton = true;    
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  
  public getCustomer(): void {
    
    this.repoService.GetAll("api/Customer/Get")
      .subscribe(customer => {
        this.dataSource.data = customer
        this.dataSource = new MatTableDataSource<Customer>(customer);
        this.dataSource.paginator = this.paginator;
        this.array = customer;
        this.totalSize = this.array.length;
        this.iterator();
        console.log(customer)
      });
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  } 
  
  public redirectToUpdate(customer){
    this.getState(customer.CountryId);
    this.customerUpdateButton = true;
    this.customerSaveButton = false;
    this.resetButton = false;
    this.selected = 0;
    this.customerAgentUpdate = customer;    
    this.customerForm = new FormGroup({      
      Storename: new FormControl(customer.Storename, [Validators.required]),
      Zone: new FormControl(customer.Zone, [Validators.required]),
      MarketPlace: new FormControl(customer.MarketPlace),
      Surname: new FormControl(customer.Surname),
      Firstname: new FormControl(customer.Firstname),
      Othernames: new FormControl(customer.Othernames),
      GenderId: new FormControl(customer.GenderId),
      PhoneNo: new FormControl(customer.PhoneNo),
      CustomerEmail: new FormControl(customer.CustomerEmail),
      Remark: new FormControl(customer.Remark),    
      CountryId: new FormControl(customer.CountryId),
      StateId: new FormControl(customer.StateId)
    });
    console.log(customer);    
  }

  public updateCustomer(){
    this.customerAgentUpdate.Storename = this.customerForm.controls["Storename"].value;    
    this.customerAgentUpdate.Zone = this.customerForm.controls["Zone"].value;
    this.customerAgentUpdate.MarketPlace = this.customerForm.controls["MarketPlace"].value;
    this.customerAgentUpdate.Surname = this.customerForm.controls["Surname"].value;    
    this.customerAgentUpdate.Firstname = this.customerForm.controls["Firstname"].value;
    this.customerAgentUpdate.Othernames = this.customerForm.controls["Othernames"].value;
    this.customerAgentUpdate.GenderId = this.customerForm.controls["GenderId"].value;
    this.customerAgentUpdate.PhoneNo = this.customerForm.controls["PhoneNo"].value;
    this.customerAgentUpdate.CustomerEmail = this.customerForm.controls["CustomerEmail"].value;
    this.customerAgentUpdate.Remark = this.customerForm.controls["Remark"].value;
    this.customerAgentUpdate.CountryId = this.customerForm.controls["CountryId"].value;
    this.customerAgentUpdate.StateId = this.customerForm.controls["StateId"].value;

    this.customerAgentUpdate.CreatedUser =  this.authenticationService.currentUserValue.UserId;
    console.log(this.customerAgentUpdate); 
    this.customerUpdateButton = false // disable update button  
    
    this.repoService.UPDATE(this.customerAgentUpdate, `api/Customer/Put`)
      .subscribe(res => {                 
        console.log(res)
          let dialogRef = this.dialog.open(SuccessDialogComponent, {
            width: '250px',
            disableClose: true,
            data: {message: "Customer Successfully Updated"}
          });
          dialogRef.afterClosed()
          .subscribe(result => {
            console.log("closed"); 
            this.initializeForm();           
            //this.supplierSaveButton = true;
            this.selected = 1;
          });
          this.getCustomer();
          this.resetButton = true;
      });
  }

}
