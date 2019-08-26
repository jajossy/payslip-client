import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../interface/country';
import { State } from '../../interface/state';
import { Customer } from '../../interface/customer';
import { RepositoryService } from './../../repository.service';
import { MatTableDataSource, MatPaginator} from '@angular/material';
import { Gender } from '../../interface/gender';


@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {
  // form varaibles
  public customerForm: FormGroup;
  countries: Country[];
  states: State[];
  CountryId : number;
  StateId : number;
  gender: Gender;
  GenderId: string;

  // table variables
  allCustomer: Customer[];
  public array: any;
  public displayedColumns = ['Storename', 'Zone', 'MarketPlace', 'Surname', 'Firstname',
                              'PhoneNo', 'details', 'update', 'delete'];
                              

  public dataSource = new MatTableDataSource<Customer>();

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
      StateId: new FormControl('')
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
    this.repoService.GetAll(`api/State/Get/${id}`)
    .subscribe(state => {
      this.states = state;            
      console.log(state)
    });
  }

  getGender(){
    this.repoService.GetAll("api/Gender/Get")
    .subscribe(gender => {
      this.gender = gender;            
      console.log(gender)
    });
  }

  fillState(CountryId){
    alert(CountryId);
    this.getState(CountryId);
  }

  public addCustomer(customerFormValue){
    console.log(customerFormValue);
    if(this.customerForm.valid){
      this.repoService.POST(customerFormValue, `api/Customer/Post`)
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

}
