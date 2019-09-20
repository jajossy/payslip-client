import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../interface/country';
import { State } from '../../interface/state';
import { Supplier } from '../../interface/supplier';
import { RepositoryService } from './../../repository.service';
import { ProgressService } from './../../progress.service';
import { MatTableDataSource, MatPaginator, MatDialog, MatSort} from '@angular/material';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {
  // form varaibles
  public supplierForm: FormGroup;
  saveForm : boolean = true;
  selected : number;
  supplierSaveButton : boolean = true;
  supplierUpdateButton : boolean = false;
  resetButton: boolean  = true;
  countries: Country[];
  states: State[];
  CountryId : number;
  StateId : number;

  supplierUpdate : Supplier;

  // table variables
  allSuppliers: Supplier[];
  public array: any;
  public displayedColumns = ['CompanyName', 'ContactName', 'ContactTitle', 'Address', 'Country',
                              'update'];
  public dataSource = new MatTableDataSource<Supplier>();

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  //@ViewChild(MatSort, {static: false}) sort: MatSort;

  applyFilter(filterValue: string) {  
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
 

  constructor(private repoService: RepositoryService,
              private progressService: ProgressService,
              private dialog: MatDialog,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.initializeForm();
    this.getCountry();
    this.getSupplier();
  }

  initializeForm(){
    this.supplierForm = new FormGroup({            
      CompanyName: new FormControl('', [Validators.required]),
      ContactName: new FormControl('', [Validators.required]),
      ContactTitle: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required, Validators.maxLength(100)]),     
      CountryId: new FormControl('', [Validators.required]),
      StateId: new FormControl('', [Validators.required]),
      Region: new FormControl('', [Validators.required]),
      Phone: new FormControl('',  [Validators.required]),
      CreatedUser: new FormControl('')
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.supplierForm.controls[controlName].hasError(errorName);
  }

  getCountry(){
    this.repoService.GetAll("api/country/Get")
    .subscribe(country => {
      this.countries = country;            
      console.log(country)
    });
  }

  getState(id: number){
    this.repoService.GetAll(`api/State/Get/${id}`)
    .subscribe(state => {
      this.states = state;            
      console.log(state)
    });
  }

  fillState(CountryId){
    //alert(CountryId);
    this.getState(CountryId);
  }

  public addSupplier(supplierFormValue){
    
    console.log(supplierFormValue);
    if(this.supplierForm.valid){
      this.supplierSaveButton = false;
      supplierFormValue.CreatedUser = this.authenticationService.currentUserValue.UserId;
      
      this.repoService.POST(supplierFormValue, `api/Supplier/Post`)
      .subscribe(res => {                 
        console.log(res)
          let dialogRef = this.dialog.open(SuccessDialogComponent, {
            width: '250px',
            disableClose: true,
            data: {message: "Supplier Successfully saved"}
          });
          dialogRef.afterClosed()
          .subscribe(result => {
            console.log("closed"); 
            this.initializeForm();           
            this.supplierSaveButton = true;
          });
          this.getSupplier();
      });
    }    
  }

  public reset() : void{
    this.supplierSaveButton = true;    
  }

  public redirectToUpdate(supplier){
    this.getState(supplier.CountryId);
    this.supplierUpdateButton = true;
    this.supplierSaveButton = false;
    this.resetButton = false;
    this.selected = 0;
    this.supplierUpdate = supplier;
    this.supplierForm = new FormGroup({            
      CompanyName: new FormControl(supplier.CompanyName, [Validators.required]),
      ContactName: new FormControl(supplier.ContactName, [Validators.required]),
      ContactTitle: new FormControl(supplier.ContactTitle, [Validators.required]),
      Address: new FormControl(supplier.Address, [Validators.required, Validators.maxLength(100)]),     
      CountryId: new FormControl(supplier.CountryId, [Validators.required]),
      StateId: new FormControl(supplier.StateId, [Validators.required]),
      Region: new FormControl(supplier.Region, [Validators.required]),
      Phone: new FormControl(supplier.Phone,  [Validators.required])
    });
    console.log(supplier);
    console.log();
  }

  public updateSupplier(){
    this.supplierUpdate.CompanyName = this.supplierForm.controls["CompanyName"].value;    
    this.supplierUpdate.ContactName = this.supplierForm.controls["ContactName"].value;
    this.supplierUpdate.ContactTitle = this.supplierForm.controls["ContactTitle"].value;
    this.supplierUpdate.Address = this.supplierForm.controls["Address"].value;
    this.supplierUpdate.CountryId = this.supplierForm.controls["CountryId"].value;
    this.supplierUpdate.StateId = this.supplierForm.controls["StateId"].value;
    this.supplierUpdate.Region = this.supplierForm.controls["Region"].value;
    this.supplierUpdate.Phone = this.supplierForm.controls["Phone"].value; 
    this.supplierUpdate.CreatedUser =  this.authenticationService.currentUserValue.UserId;
    console.log(this.supplierUpdate); 
    this.supplierUpdateButton = false // disable update button  
    
    this.repoService.UPDATE(this.supplierUpdate, `api/Supplier/Put`)
      .subscribe(res => {                 
        console.log(res)
          let dialogRef = this.dialog.open(SuccessDialogComponent, {
            width: '250px',
            disableClose: true,
            data: {message: "Supplier Successfully Updated"}
          });
          dialogRef.afterClosed()
          .subscribe(result => {
            console.log("closed"); 
            this.initializeForm();           
            //this.supplierSaveButton = true;
            this.selected = 1;
          });
          this.getSupplier();
          this.resetButton = true;
      });
  }
  

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  
  public getSupplier(): void {
    
    this.repoService.GetAll("api/Supplier/Get")
      .subscribe(supplier => {
        this.dataSource.data = supplier
        this.dataSource = new MatTableDataSource<Supplier>(supplier);
        this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;
        this.array = supplier;
        this.totalSize = this.array.length;
        this.iterator();
        console.log(supplier)
      });
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }  

}
