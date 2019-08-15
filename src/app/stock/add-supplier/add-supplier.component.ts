import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../interface/country';
import { State } from '../../interface/state';
import { Supplier } from '../../interface/supplier';
import { RepositoryService } from './../../repository.service';
import { MatTableDataSource, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {
  // form varaibles
  public supplierForm: FormGroup;
  countries: Country[];
  states: State[];
  CountryId : number;
  StateId : number;

  // table variables
  allSuppliers: Supplier[];
  public array: any;
  public displayedColumns = ['CompanyName', 'ContactName', 'ContactTitle', 'Address', 'Country',
                              'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Supplier>();

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 

  constructor(private repoService: RepositoryService) { }

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
      Phone: new FormControl('',  [Validators.required])
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
    alert(CountryId);
    this.getState(CountryId);
  }

  public addSupplier(supplierFormValue){
    console.log(supplierFormValue);
    if(this.supplierForm.valid){
      this.repoService.POST(supplierFormValue, `api/Supplier/Post`)
      .subscribe(res => {                 
        console.log(res)
      });
    }    
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
